## Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

## Running Tests (Cypress)

To execute the automated test scenarios from the command line:

```bash
npm run test
```

This command will:

1. Run Cypress in headless mode.
2. Execute the specific test suite: `cypress/e2e/apiTask.cy.js`.
3. Output the results to your terminal.

## Running Tests (Postman)

A Postman collection is included for manual verification if required.

1. Open Postman.
2. Import `moxymind_task.postman_collection.json`.
3. Run the collection via the "Runner" tab or send individual requests.
4. Check the "Test Results" tab for pass/fail status.

## Project Structure

- **Test Logic**: `cypress/e2e/apiTask.cy.js` (Contains GET and POST scenarios)
- **Test Data**: `cypress/fixtures/users.json` (Data for Data-Driven tests)
- **Postman**: `moxymind_task.postman_collection.json` (Alternative manual tests)
- **Configuration**: `cypress.config.js` (Base URL setup)

## Running Tests

Run all tests:

```bash
npx cypress run
```

Open Cypress UI:

```bash
npx cypress open
```
