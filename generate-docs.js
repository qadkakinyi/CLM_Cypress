// cypress-jsdoc-parser.js
const fs = require('fs');
const path = require('path');

class CypressJSDocParser {
    constructor(cypressPath = './cypress/e2e', outputPath = './Writerside/topics/tests') {
        this.cypressPath = cypressPath;
        this.outputPath = outputPath;
        this.parsedData = [];
        this.folderStructure = new Map(); // Track folder structure
    }

    // Parse JSDoc-style comments from test files
    parseJSDocComments(content, filePath) {
        const jsDocPattern = /\/\*\*([\s\S]*?)\*\//g;
        const tagPattern = /@(\w+)(?:\s+([^\r\n@]*(?:\r?\n(?!\s*\*\s*@)[^\r\n]*)*))?/g;

        let match;
        const blocks = [];

        while ((match = jsDocPattern.exec(content)) !== null) {
            const commentBlock = match[1];
            const tags = {};

            // Reset regex for each comment block
            tagPattern.lastIndex = 0;

            let tagMatch;
            while ((tagMatch = tagPattern.exec(commentBlock)) !== null) {
                const tagName = tagMatch[1];
                let tagValue = tagMatch[2] || '';

                // Clean up the tag value - remove asterisks and extra whitespace
                tagValue = tagValue
                    .replace(/^\s*\*\s*/gm, '') // Remove leading asterisks
                    .replace(/\s+/g, ' ') // Normalize whitespace
                    .trim();

                if (tagValue) {
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
                lineNumber: content.substring(0, match.index).split('\n').length,
                rawComment: match[0]
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

    // Get folder structure information
    getFolderInfo(filePath) {
        const relativePath = path.relative(this.cypressPath, filePath);
        const pathParts = relativePath.split(path.sep);
        const fileName = pathParts.pop(); // Remove filename
        const folderPath = pathParts.join(path.sep);

        return {
            folderPath,
            pathParts,
            fileName,
            relativePath
        };
    }

    // Create sanitized folder and file names for WriterSide
    sanitizeName(name) {
        return name.replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/--+/g, '-');
    }

    // Parse a single test file
    parseTestFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const folderInfo = this.getFolderInfo(filePath);

        const jsDocBlocks = this.parseJSDocComments(content, filePath);
        const testStructure = this.extractTestStructure(content);

        // Match JSDoc comments to test elements
        const enrichedData = {
            fileName: folderInfo.fileName,
            filePath,
            relativePath: folderInfo.relativePath,
            folderPath: folderInfo.folderPath,
            pathParts: folderInfo.pathParts,
            metadata: {},
            testSuites: [],
            testCases: []
        };

        // Find file-level metadata (comments with file-level tags)
        const fileMetadata = jsDocBlocks.find(block =>
            block.tags.testSuite || block.tags.fileDescription || block.tags.module ||
            block.tags.description || block.tags.priority || block.tags.owner
        );

        if (fileMetadata) {
            enrichedData.metadata = fileMetadata.tags;
        }

        // Process test suites (describe blocks)
        testStructure.describes.forEach(describe => {
            // Look for JSDoc comments that are close to the describe block or contain suite-related tags
            const associatedJSDoc = jsDocBlocks.find(block => {
                const lineDistance = Math.abs(block.lineNumber - describe.lineNumber);
                const hasSuiteTags = block.tags.suite || block.tags.description;
                return lineDistance <= 5 || hasSuiteTags;
            });

            enrichedData.testSuites.push({
                title: describe.title,
                lineNumber: describe.lineNumber,
                metadata: associatedJSDoc ? associatedJSDoc.tags : {}
            });
        });

        // Process test cases (it blocks)
        testStructure.tests.forEach(test => {
            // Look for JSDoc comments that are close to the it block or contain test-related tags
            const associatedJSDoc = jsDocBlocks.find(block => {
                const lineDistance = Math.abs(block.lineNumber - test.lineNumber);
                const hasTestTags = block.tags.scenario || block.tags.steps || block.tags.expectedResult;
                return lineDistance <= 5 || hasTestTags;
            });

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
        const topicId = this.sanitizeName(testData.fileName.replace(/\.cy\.(ts|js)$/, ''));
        const title = testData.metadata.testSuite || testData.fileName.replace(/\.cy\.(ts|js)$/, '');

        let topic = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic SYSTEM "https://resources.jetbrains.com/writerside/1.0/xhtml-entities.dtd">
<topic xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://resources.jetbrains.com/writerside/1.0/topic.v2.xsd"
      title="${title}" id="${topicId}">

   <show-structure for="chapter,procedure" depth="2"/>
  
   <chapter title="Overview">
       <p><b>File:</b> <code>${testData.relativePath}</code></p>`;

        // Add folder path information
        if (testData.folderPath) {
            topic += `\n        <p><b>Folder:</b> <code>${testData.folderPath}</code></p>`;
        }

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
        if (testData.metadata.environment) {
            topic += `\n        <p><b>Environment:</b> ${testData.metadata.environment}</p>`;
        }
        if (testData.metadata.lastUpdated) {
            topic += `\n        <p><b>Last Updated:</b> ${testData.metadata.lastUpdated}</p>`;
        }
        if (testData.metadata.dependencies) {
            topic += `\n        <p><b>Dependencies:</b> ${testData.metadata.dependencies}</p>`;
        }
        if (testData.metadata.testData) {
            topic += `\n        <p><b>Test Data:</b> ${testData.metadata.testData}</p>`;
        }

        topic += `\n    </chapter>`;

        // Add test suites
        if (testData.testSuites.length > 0) {
            topic += `\n\n    <chapter title="Test Suites">`;

            testData.testSuites.forEach(suite => {
                topic += `\n        <chapter title="${suite.title}">`;

                // Only add description if it's different from file-level description
                if (suite.metadata.description && suite.metadata.description !== testData.metadata.description) {
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

                if (testCase.metadata.scenario) {
                    topic += `\n            <p><b>Scenario:</b> ${testCase.metadata.scenario}</p>`;
                }

                if (testCase.metadata.description) {
                    topic += `\n            <p>${testCase.metadata.description}</p>`;
                }

                if (testCase.metadata.priority) {
                    topic += `\n            <p><b>Priority:</b> ${testCase.metadata.priority}</p>`;
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
                    const expectedResults = Array.isArray(testCase.metadata.expectedResult) ?
                        testCase.metadata.expectedResult : [testCase.metadata.expectedResult];
                    topic += `\n            <chapter title="Expected Results">`;
                    expectedResults.forEach(result => {
                        topic += `\n                <p>• ${result}</p>`;
                    });
                    topic += `\n            </chapter>`;
                }

                if (testCase.metadata.notes) {
                    const notes = Array.isArray(testCase.metadata.notes) ?
                        testCase.metadata.notes : [testCase.metadata.notes];
                    topic += `\n            <chapter title="Notes">`;
                    notes.forEach(note => {
                        topic += `\n                <note>${note}</note>`;
                    });
                    topic += `\n            </chapter>`;
                }

                if (testCase.metadata.performance) {
                    topic += `\n            <p><b>Performance:</b> ${testCase.metadata.performance}</p>`;
                }

                if (testCase.metadata.integration) {
                    topic += `\n            <p><b>Integration:</b> ${testCase.metadata.integration}</p>`;
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

        // Include file path from e2e root
        topic += `\n\n    <chapter title="Source Code">
       <p><b>File Path:</b> <code>${testData.relativePath}</code></p>
   </chapter>`;

        topic += `\n\n</topic>`;

        return { topicId, content: topic };
    }

    // Create folder structure in output directory
    createFolderStructure(testData) {
        if (testData.folderPath) {
            const outputFolderPath = path.join(this.outputPath, testData.folderPath);
            if (!fs.existsSync(outputFolderPath)) {
                fs.mkdirSync(outputFolderPath, { recursive: true });
            }
            return outputFolderPath;
        }
        return this.outputPath;
    }

    // Build folder structure map for WriterSide tree
    buildFolderStructureMap() {
        const structureMap = new Map();

        this.parsedData.forEach(testData => {
            if (testData.folderPath) {
                const parts = testData.pathParts;
                let currentPath = '';

                parts.forEach((part, index) => {
                    const parentPath = currentPath;
                    currentPath = currentPath ? `${currentPath}/${part}` : part;

                    if (!structureMap.has(currentPath)) {
                        structureMap.set(currentPath, {
                            name: part,
                            sanitizedName: this.sanitizeName(part),
                            fullPath: currentPath,
                            parentPath: parentPath || null,
                            children: new Set(),
                            files: [],
                            isLeaf: false
                        });
                    }

                    // Add to parent's children
                    if (parentPath && structureMap.has(parentPath)) {
                        structureMap.get(parentPath).children.add(currentPath);
                    }
                });

                // Add file to its folder
                if (structureMap.has(testData.folderPath)) {
                    structureMap.get(testData.folderPath).files.push(testData);
                }
            }
        });

        return structureMap;
    }

    // Generate category pages for folders
    generateFolderCategoryPages(structureMap) {
        const generatedCategories = [];

        structureMap.forEach((folderInfo, folderPath) => {
            const categoryId = `category-${folderInfo.sanitizedName}`;
            const title = folderInfo.name.charAt(0).toUpperCase() + folderInfo.name.slice(1);

            let categoryContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic SYSTEM "https://resources.jetbrains.com/writerside/1.0/xhtml-entities.dtd">
<topic xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://resources.jetbrains.com/writerside/1.0/topic.v2.xsd"
      title="${title} Tests" id="${categoryId}">

   <chapter title="Overview">
       <p>Test files in the <code>${folderPath}</code> directory.</p>
       <p><b>Total Files:</b> ${folderInfo.files.length}</p>
   </chapter>`;

            if (folderInfo.files.length > 0) {
                categoryContent += `\n\n   <chapter title="Test Files">`;

                folderInfo.files.forEach(file => {
                    const topicId = this.sanitizeName(file.fileName.replace(/\.cy\.(ts|js)$/, ''));
                    const title = file.metadata.testSuite || file.fileName.replace(/\.cy\.(ts|js)$/, '');

                    categoryContent += `\n       <chapter title="${title}">
           <p><b>File:</b> <code>${file.fileName}</code></p>`;

                    if (file.metadata.description) {
                        categoryContent += `\n           <p>${file.metadata.description}</p>`;
                    }

                    categoryContent += `\n           <p><a href="${topicId}.topic">View Test Details</a></p>
       </chapter>`;
                });

                categoryContent += `\n   </chapter>`;
            }

            categoryContent += `\n\n</topic>`;

            // Save category file in the appropriate folder
            const outputDir = path.join(this.outputPath, folderPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const categoryFileName = `${categoryId}.topic`;
            const categoryFilePath = path.join(outputDir, categoryFileName);

            fs.writeFileSync(categoryFilePath, categoryContent);

            generatedCategories.push({
                id: categoryId,
                file: categoryFileName,
                path: folderPath,
                folderInfo
            });

            console.log(`Generated category: ${categoryFileName} in ${folderPath}`);
        });

        return generatedCategories;
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

        // Build folder structure map
        const structureMap = this.buildFolderStructureMap();

        // Generate folder category pages
        const generatedCategories = this.generateFolderCategoryPages(structureMap);


// Generate individual test topics
        const generatedTopics = [];
        this.parsedData.forEach(testData => {
            const topic = this.generateWritersideTopic(testData);
            const fileName = `${topic.topicId}.topic`;

            // Create folder structure and place file in correct folder
            const outputDir = this.createFolderStructure(testData);
            const filePath = path.join(outputDir, fileName);

            fs.writeFileSync(filePath, topic.content);
            generatedTopics.push({
                id: topic.topicId,
                file: fileName,
                folder: testData.folderPath,
                testData
            });

            console.log(`Generated: ${fileName} in ${testData.folderPath || 'root'}`);
        });

        this.generateSummaryReport(generatedTopics, generatedCategories, structureMap);

        console.log(`\nGenerated ${generatedTopics.length} test documentation topics!`);
        console.log(`Generated ${generatedCategories.length} category pages!`);

        return { topics: generatedTopics, categories: generatedCategories, structure: structureMap };
    }

    // Generate enhanced summary report
    generateSummaryReport(topics, categories, structureMap) {
        const report = {
            totalFiles: topics.length,
            totalCategories: categories.length,
            totalTestSuites: topics.reduce((sum, topic) => sum + topic.testData.testSuites.length, 0),
            totalTestCases: topics.reduce((sum, topic) => sum + topic.testData.testCases.length, 0),
            filesWithMetadata: topics.filter(topic => Object.keys(topic.testData.metadata).length > 0).length,
            folderStructure: {},
            priorities: {},
            owners: new Set(),
            tags: new Set()
        };

        // Build folder summary
        structureMap.forEach((folderInfo, folderPath) => {
            report.folderStructure[folderPath] = {
                fileCount: folderInfo.files.length,
                testSuites: folderInfo.files.reduce((sum, file) => sum + file.testSuites.length, 0),
                testCases: folderInfo.files.reduce((sum, file) => sum + file.testCases.length, 0)
            };
        });

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
        console.log(`Total category pages: ${report.totalCategories}`);
        console.log(`Total test suites: ${report.totalTestSuites}`);
        console.log(`Total test cases: ${report.totalTestCases}`);
        console.log(`Files with metadata: ${report.filesWithMetadata}`);

        console.log('\n=== FOLDER STRUCTURE ===');
        Object.entries(report.folderStructure).forEach(([folder, stats]) => {
            console.log(`${folder}: ${stats.fileCount} files, ${stats.testSuites} suites, ${stats.testCases} tests`);
        });

        console.log(`\nUnique owners: ${Array.from(report.owners).join(', ')}`);
        console.log(`Unique tags: ${Array.from(report.tags).join(', ')}`);
        console.log(`Priority distribution:`, report.priorities);
    }
}

// Usage
const parser = new CypressJSDocParser();
parser.generate(); 
