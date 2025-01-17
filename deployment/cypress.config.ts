const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //numTestsKeptInMemory: 0, //prevents `aw snap` error from appearing
  viewportWidth: 1680,
  viewportHeight: 1000,
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
    },
    baseUrl: 'https://complytek-testing.regtek.co',
    supportFile: './cypress/support/e2e.ts',
    projectId: "s2jddr",
    //experimentalSessionAndOrigin: true, //allow visiting different protocols 
    experimentalStudio: true
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
});
