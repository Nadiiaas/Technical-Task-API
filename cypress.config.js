const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://reqres.in',
    supportFile: false,
    video: false,               
    screenshotOnRunFailure: false, 
    chromeWebSecurity: false,    
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000
  },
});