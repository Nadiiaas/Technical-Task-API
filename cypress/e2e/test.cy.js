const usersData = require("../fixtures/users.json");

describe("Technical task - API test automation", () => {
  
  const getHeaders = () => ({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Content-Type": "application/json",
  });

  it("GET - List Users (Page 2)", () => {
    cy.request({
      method: "GET",
      url: "/api/users?page=2",
      headers: getHeaders(),
      failOnStatusCode: false
    }).then((response) => {
     
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("total");
      
      expect(response.body.data[0].last_name).to.eq("Lawson");
      expect(response.body.data[1].last_name).to.eq("Ferguson");

      const receivedCount = response.body.data.length;
      const totalValue = response.body.total;
      expect(receivedCount).to.be.lte(totalValue); 

      expect(response.body.page).to.be.a("number");
      expect(response.body.total).to.be.a("number");
      expect(response.body.data).to.be.an("array");
    });
  });

  usersData.forEach((user) => {
    it(`POST - Create User: ${user.name}`, () => {
      cy.request({
        method: "POST",
        url: "/api/users", 
        body: user,
        headers: getHeaders(),
        failOnStatusCode: false,
      }).then((response) => {
       
        expect(response.status).to.eq(201);

        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("createdAt");

        expect(response.body.name).to.eq(user.name);
        expect(response.body.job).to.eq(user.job);

        expect(response.duration).to.be.lessThan(1000); 

        expect(response.body.id.toString()).to.not.be.empty;
        expect(response.body.createdAt).to.be.a("string");
      });
    });
  });
});
