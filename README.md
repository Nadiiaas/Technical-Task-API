## Installation

Use the package manager npm to install all needed dependencies

```bash
npm install
```

## Usage

### Importing Test Data

Load test data from JSON fixtures for data-driven tests

```javascript
const usersData = require("../fixtures/users.json");
```

### API Requests

```javascript
cy.request("METHOD", "URL");
```

### Assertions

Verify API responses using Chai assertions

```javascript
expect(response.status).to.eq(200);
expect(response.body).to.have.property("id");
expect(response.body.name).to.eq("Lawson");
```

### Data-Driven Tests

Loop through test data to run the same test with different inputs

```javascript
usersData.forEach((user) => {
  it(`Test with ${user.name}`, () => {
    cy.request("POST", "/api/users", user);
  });
});
```

## Test File Template

```javascript
// Import test data
const usersData = require("../fixtures/users.json");

describe("Task", () => {
  // Test Case 1: GET Request
  it("GET - List Users (Page 2)", () => {
    cy.request("GET", "/api/users?page=2").then((response) => {
      // Verify status code
      expect(response.status).to.eq(200);

      // Check response structure
      expect(response.body).to.have.property("total");
      expect(response.body.data[0].last_name).to.eq("Lawson");
      expect(response.body.data[1].last_name).to.eq("Ferguson");

      // Verify user count
      const receivedCount = response.body.data.length;
      const totalCount = response.body.total;

      cy.log(`Users on page: ${receivedCount}, Total users: ${totalCount}`);
      expect(receivedCount).to.be.lte(totalCount);

      // Check data types
      expect(response.body.page).to.be.a("number");
      expect(response.body.data).to.be.an("array");
    });
  });

  // Test Case 2: POST Request (Data Driven)
  usersData.forEach((user) => {
    it(`POST - Create User: ${user.name}`, () => {
      const timeLimit = 500;

      cy.request("POST", "/api/users", user).then((response) => {
        // Verify status code
        expect(response.status).to.eq(201);

        // Check required fields
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("createdAt");

        // Verify data matches request
        expect(response.body.name).to.eq(user.name);
        expect(response.body.job).to.eq(user.job);

        // Check response time
        expect(response.duration).to.be.lessThan(timeLimit);

        // Verify data types
        expect(response.body.id).to.be.a("string");
        expect(response.body.createdAt).to.be.a("string");
      });
    });
  });
});
```

## Running Tests

Run all tests:

```bash
npx cypress run
```

Open Cypress UI:

```bash
npx cypress open
```
