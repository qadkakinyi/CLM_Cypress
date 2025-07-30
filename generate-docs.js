// cypress-jsdoc-parser.js
const fs = require('fs');
const path = require('path');

class CypressJSDocParser {
    constructor(cypressPath = './cypress/e2e', outputPath = './Writerside/topics/tests') {
        this.cypressPath = cypressPath;
        this.outputPath = outputPath;
        this.parsedData = [];
    }

    // Parse JSDoc-style comments from test files
    parseJSDocComments(content, filePath) {
        const jsDocPattern = /\/\*\*([\s\S]*?)\*\//g;
        const tagPattern = /@(\w+)\s+(.+?)(?=@\w+|$)/gs;

        let match;
        const blocks = [];

        while ((match = jsDocPattern.exec(content)) !== null) {
            const commentBlock = match[1];
            const tags = {};

            let tagMatch;
            while ((tagMatch = tagPattern.exec(commentBlock)) !== null) {
                const tagName = tagMatch[1];
                const tagValue = tagMatch[2].replace(/\s*\*\s*/g, ' ').trim();

                if (tags[tagName]) {
                    // Handle multiple values for same tag
                    if (Array.isArray(tags[tagName])) {
                        tags[tagName].push(tagValue);
                    } else {
                        tags[tagName] = [tags[tagName], tagValue];
                    }
                } else {
                    tags[tagName] = tagValue;
                }
            }

            // Get the code block following this comment
            const commentEnd = match.index + match[0].length;
            const codeAfterComment = content.substring(commentEnd);
            const nextCommentStart = codeAfterComment.search(/\/\*\*|describe|it/);
            const associatedCode = nextCommentStart > -1 ?
                codeAfterComment.substring(0, nextCommentStart).trim() : '';

            blocks.push({
                tags,
                associatedCode,
                lineNumber: content.substring(0, match.index).split('\n').length
            });
        }

        return blocks;
    }

    // Extract test structure (describes and its)
    extractTestStructure(content) {
        const structure = {
            describes: [],
            tests: []
        };

        // Find describe blocks
        const describeRegex = /describe\s*\(\s*['"`](.*?)['"`]\s*,\s*\(\s*\)\s*=>\s*\{|describe\s*\(\s*['"`](.*?)['"`]\s*,\s*function\s*\(\s*\)\s*\{/g;
        let match;

        while ((match = describeRegex.exec(content)) !== null) {
            structure.describes.push({
                title: match[1] || match[2],
                position: match.index,
                lineNumber: content.substring(0, match.index).split('\n').length
            });
        }

        // Find it blocks
        const itRegex = /it\s*\(\s*['"`](.*?)['"`]\s*,/g;
        while ((match = itRegex.exec(content)) !== null) {
            structure.tests.push({
                title: match[1],
                position: match.index,
                lineNumber: content.substring(0, match.index).split('\n').length
            });
        }

        return structure;
    }

    // Parse a single test file
    parseTestFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        const relativePath = path.relative(this.cypressPath, filePath);

        const jsDocBlocks = this.parseJSDocComments(content, filePath);
        const testStructure = this.extractTestStructure(content);

        // Match JSDoc comments to test elements
        const enrichedData = {
            fileName,
            filePath,
            relativePath,
            metadata: {},
            testSuites: [],
            testCases: []
        };

        // Find file-level metadata (usually before first describe)
        const fileMetadata = jsDocBlocks.find(block =>
            block.tags.testSuite || block.tags.fileDescription || block.tags.module
        );

        if (fileMetadata) {
            enrichedData.metadata = fileMetadata.tags;
        }

        // Process test suites (describe blocks)
        testStructure.describes.forEach(describe => {
            const associatedJSDoc = jsDocBlocks.find(block =>
                Math.abs(block.lineNumber - describe.lineNumber) <= 3
            );

            enrichedData.testSuites.push({
                title: describe.title,
                lineNumber: describe.lineNumber,
                metadata: associatedJSDoc ? associatedJSDoc.tags : {}
            });
        });

        // Process test cases (it blocks)
        testStructure.tests.forEach(test => {
            const associatedJSDoc = jsDocBlocks.find(block =>
                Math.abs(block.lineNumber - test.lineNumber) <= 3
            );

            enrichedData.testCases.push({
                title: test.title,
                lineNumber: test.lineNumber,
                metadata: associatedJSDoc ? associatedJSDoc.tags : {}
            });
        });

        return enrichedData;
    }

    // Generate Writerside topic from parsed data
    generateWritersideTopic(testData) {
        const topicId = testData.fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        const title = testData.metadata.testSuite || testData.fileName.replace(/\.cy\.(ts|js)$/, '');

        let topic = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic SYSTEM "https://resources.jetbrains.com/writerside/1.0/xhtml-entities.dtd">
<topic xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:noNamespaceSchemaLocation="https://resources.jetbrains.com/writerside/1.0/topic.v2.xsd"
       title="${title}" id="${topicId}">

    <show-structure for="chapter,procedure" depth="2"/>
    
    <chapter title="Overview">
        <p><b>File:</b> <code>${testData.relativePath}</code></p>`;

        // Add metadata if available
        if (testData.metadata.description) {
            topic += `\n        <p><b>Description:</b> ${testData.metadata.description}</p>`;
        }
        if (testData.metadata.priority) {
            topic += `\n        <p><b>Priority:</b> ${testData.metadata.priority}</p>`;
        }
        if (testData.metadata.owner) {
            topic += `\n        <p><b>Owner:</b> ${testData.metadata.owner}</p>`;
        }
        if (testData.metadata.tags) {
            const tags = Array.isArray(testData.metadata.tags) ?
                testData.metadata.tags.join(', ') : testData.metadata.tags;
            topic += `\n        <p><b>Tags:</b> ${tags}</p>`;
        }

        topic += `\n    </chapter>`;

        // Add test suites
        if (testData.testSuites.length > 0) {
            topic += `\n\n    <chapter title="Test Suites">`;

            testData.testSuites.forEach(suite => {
                topic += `\n        <chapter title="${suite.title}">`;

                if (suite.metadata.description) {
                    topic += `\n            <p>${suite.metadata.description}</p>`;
                }

                if (suite.metadata.prerequisites) {
                    const prereqs = Array.isArray(suite.metadata.prerequisites) ?
                        suite.metadata.prerequisites : [suite.metadata.prerequisites];
                    topic += `\n            <chapter title="Prerequisites">`;
                    prereqs.forEach(prereq => {
                        topic += `\n                <p>• ${prereq}</p>`;
                    });
                    topic += `\n            </chapter>`;
                }

                topic += `\n        </chapter>`;
            });

            topic += `\n    </chapter>`;
        }

        // Add test cases
        if (testData.testCases.length > 0) {
            topic += `\n\n    <chapter title="Test Scenarios">`;

            testData.testCases.forEach((testCase, index) => {
                topic += `\n        <procedure title="${testCase.title}" id="test-${index + 1}">`;

                if (testCase.metadata.description) {
                    topic += `\n            <p>${testCase.metadata.description}</p>`;
                }

                if (testCase.metadata.testData) {
                    topic += `\n            <p><b>Test Data:</b> ${testCase.metadata.testData}</p>`;
                }

                if (testCase.metadata.steps) {
                    const steps = Array.isArray(testCase.metadata.steps) ?
                        testCase.metadata.steps : [testCase.metadata.steps];
                    steps.forEach(step => {
                        topic += `\n            <step>${step}</step>`;
                    });
                } else {
                    topic += `\n            <step>Execute test case</step>`;
                    topic += `\n            <step>Verify expected results</step>`;
                }

                if (testCase.metadata.expectedResult) {
                    topic += `\n            <p><b>Expected Result:</b> ${testCase.metadata.expectedResult}</p>`;
                }

                if (testCase.metadata.notes) {
                    topic += `\n            <note>${testCase.metadata.notes}</note>`;
                }

                topic += `\n        </procedure>`;
            });

            topic += `\n    </chapter>`;
        }

        // Add execution information
        topic += `\n\n    <chapter title="Execution">
        <chapter title="Run Individual Test">
            <code-block lang="bash">
                npx cypress run --spec "${testData.relativePath}"
            </code-block>
        </chapter>
        
        <chapter title="Run in Interactive Mode">
            <code-block lang="bash">
                npx cypress open --spec "${testData.relativePath}"
            </code-block>
        </chapter>
    </chapter>`;

        // Include source code
        topic += `\n\n    <chapter title="Source Code">
        <code-block lang="typescript" src="${testData.filePath}" />
    </chapter>`;

        topic += `\n\n</topic>`;

        return { topicId, content: topic };
    }

    // Scan and process all test files
    generate() {
        console.log('Scanning Cypress tests for JSDoc comments...');

        const scanDir = (dirPath) => {
            const items = fs.readdirSync(dirPath);

            items.forEach(item => {
                const fullPath = path.join(dirPath, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    scanDir(fullPath);
                } else if (item.endsWith('.cy.ts') || item.endsWith('.cy.js')) {
                    console.log(`Processing: ${fullPath}`);
                    const testData = this.parseTestFile(fullPath);
                    this.parsedData.push(testData);
                }
            });
        };

        scanDir(this.cypressPath);

        // Create output directory
        if (!fs.existsSync(this.outputPath)) {
            fs.mkdirSync(this.outputPath, { recursive: true });
        }

        // Generate topics
        const generatedTopics = [];
        this.parsedData.forEach(testData => {
            const topic = this.generateWritersideTopic(testData);
            const fileName = `${topic.topicId}.topic`;
            const filePath = path.join(this.outputPath, fileName);

            fs.writeFileSync(filePath, topic.content);
            generatedTopics.push({
                id: topic.topicId,
                file: fileName,
                testData
            });

            console.log(`Generated: ${fileName}`);
        });

        this.generateSummaryReport(generatedTopics);

        console.log(`\nGenerated ${generatedTopics.length} test documentation topics!`);
        return generatedTopics;
    }

    // Generate summary report
    generateSummaryReport(topics) {
        const report = {
            totalFiles: topics.length,
            totalTestSuites: topics.reduce((sum, topic) => sum + topic.testData.testSuites.length, 0),
            totalTestCases: topics.reduce((sum, topic) => sum + topic.testData.testCases.length, 0),
            filesWithMetadata: topics.filter(topic => Object.keys(topic.testData.metadata).length > 0).length,
            priorities: {},
            owners: new Set(),
            tags: new Set()
        };

        topics.forEach(topic => {
            const metadata = topic.testData.metadata;
            if (metadata.priority) {
                report.priorities[metadata.priority] = (report.priorities[metadata.priority] || 0) + 1;
            }
            if (metadata.owner) {
                report.owners.add(metadata.owner);
            }
            if (metadata.tags) {
                const tags = Array.isArray(metadata.tags) ? metadata.tags : [metadata.tags];
                tags.forEach(tag => report.tags.add(tag));
            }
        });

        console.log('\n=== GENERATION SUMMARY ===');
        console.log(`Total test files: ${report.totalFiles}`);
        console.log(`Total test suites: ${report.totalTestSuites}`);
        console.log(`Total test cases: ${report.totalTestCases}`);
        console.log(`Files with metadata: ${report.filesWithMetadata}`);
        console.log(`Unique owners: ${Array.from(report.owners).join(', ')}`);
        console.log(`Unique tags: ${Array.from(report.tags).join(', ')}`);
        console.log(`Priority distribution:`, report.priorities);
    }
}

// Usage
const parser = new CypressJSDocParser();
parser.generate();
