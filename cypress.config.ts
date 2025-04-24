const { defineConfig } = require("cypress");

const baseUrl = 'https://complytek-testing-hotfix.regtek.co'

module.exports = defineConfig({
  defaultCommandTimeout: 16000,
  numTestsKeptInMemory: 1,
  viewportWidth: 1680,
  viewportHeight: 1000,
  video: false,
  screenshotsFolder: "cypress/screenshots",
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome, mocha-junit-reporter",
    mochawesomeReporterOptions: {
      reportDir: 'cypress/results/mochawesome',
      overwrite: false,
      html: true,
      json: true
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/results/junit/results-[hash].xml',
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: baseUrl,
    supportFile: './cypress/support/e2e.ts',
    projectId: "s2jddr",
    experimentalStudio: true
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  },
  env: {
    api_baseUrl: 'https://complytek-testing-hotfix-api.regtek.co'
  }
});
