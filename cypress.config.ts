const { defineConfig } = require("cypress");

const baseUrl =  'https://complytek-testing-hotfix.regtek.co'

module.exports = defineConfig({
  defaultCommandTimeout: 16000,
  numTestsKeptInMemory: 1, //prevents `aw snap` error from appearing
  viewportWidth: 1680,
  viewportHeight: 1000,
  video: false,
  screenshotsFolder: "cypress/screenshots",
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome, mocha-junit-reporter",
    mochawesomeReporterOptions:{
      reportDir: 'cypress/results/mochawesome',
      overwrite: false,
      html: true,
      json: true
    },
    mochaJunitReporterReporterOptions:{
      mochaFile: 'cypress/results/junit/results-[hash].xml',
    }

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
