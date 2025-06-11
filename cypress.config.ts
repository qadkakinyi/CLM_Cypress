const { defineConfig } = require("cypress");

const baseUrl =  'https://complytek-testing-hotfix.regtek.co'
// const baseUrl =  'http://localhost:4340/'

module.exports = defineConfig({
  projectId: 's2jddr',
  defaultCommandTimeout: 10000,
  numTestsKeptInMemory: 1, //prevents `aw snap` error from appearing
  viewportWidth: 1680,
  viewportHeight: 1000,
  video: true,
  screenshotsFolder: "cypress/screenshots",
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    // reporterEnabled: "mochawesome, mocha-junit-reporter, reporter/SpiraReporter.js",
    reporterEnabled: "mochawesome, mocha-junit-reporter",
    mochawesomeReporterOptions:{
      reportDir: 'cypress/results/mochawesome',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    mochaJunitReporterReporterOptions:{
      mochaFile: 'cypress/results/junit/results-[hash].xml',
    },
    // 'reporter/SpiraReporter.jsReporterOptions':{
    //   projectId: 24,
    //   releaseId: 1,
    //   testSetId: 7,
    //   login: 'administrator',
    //   apiKey: '{FB74A79A-5D4D-4F44-858C-74EC957418FF}',
    //   protocol: 'https',
    //   host: 'demo-us.spiraservice.net',
    //   vdir: 'complytek',
    //   rejectUnauthorized: false,
    //   strictSSL: false,
    //   mapping:{
    //     "Add Client Individual": "TC:290",
    //     "Add, Edit, Delete Client Document": "0002",
    //     "Perform Client Evaluation Using Staging APIs": "0003",
    //     "Add, Edit, Delete Client Policy": "0004",
    //     "Navigate Through Client Individual Detail Lines": "0005",
    //     "Add, Edit, Delete Client Tax Residency": "0006",
    //     "Add, Edit, Delete Client Address": "0007",
    //     "Edit Corporate Client Profile": "0008",
    //     "Dashboard": "0009",
    //     "Internal Screening": "0010"
    //   }
    // }

  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: baseUrl,
    supportFile: './cypress/support/e2e.ts',
    projectId: "s2jddr",
    //experimentalSessionAndOrigin: true, //allow visiting different protocols 
    experimentalStudio: true,
    // experimentalRunAllSpecs: true,
    // experimentalMemoryManagement: true
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  },
  env:{
    api_baseUrl :  'https://complytek-testing-hotfix-api.regtek.co'
  }
});
