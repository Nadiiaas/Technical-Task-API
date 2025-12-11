## Installation

Use the package manager npm to install all needed dependencies.

```bash
npm install
```

## Usage

For test data, the JSON fixture should be imported.

```javascript
const usersData = require("../fixtures/users.json");
```

Cypress relies on global describe for defining tests, so no additional Test classes or imports are required.

All assertions use Cypress’s built-in Chai assertion library, which makes the expect function available globally—no custom helpers or extra imports are needed.

```javascript
expect(response.status).to.eq(200);
```

## Template of the test file

```javascript
const usersData = require("../fixtures/users.json");

describe("API Task", () => {
  // GET Scenario
  it("GET - List Users", () => {
    cy.request("GET", "/api/users?page=2").then((response) => {
      // assert status
      expect(response.status).to.eq(200);
      // verify results
      expect(response.body).to.have.property("total");
    });
  });

  // POST Scenario (Data Driven)
  usersData.forEach((user) => {
    it(`POST - Create User: ${user.name}`, () => {
      cy.request("POST", "/api/users", user).then((response) => {
        // assert status
        expect(response.status).to.eq(201);
      });
    });
  });
});
```

## Run from command line

To run tests from command line the following command should be used:

```bash
npm run test
```
