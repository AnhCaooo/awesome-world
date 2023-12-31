import { defineConfig } from 'cypress'

export default defineConfig({

  scrollBehavior: 'nearest',

  e2e: {
    'baseUrl': 'http://localhost:4200',
    retries: 2
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})