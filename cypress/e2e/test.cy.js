const usersData = require('../fixtures/users.json');

describe('Technical Task', () => {
  
  let realUserAgent = '';

  beforeEach(() => {

    cy.visit('/');
    
    cy.get('img[alt="ReqRes"]', { timeout: 30000 }).should('be.visible');

    cy.window().then((win) => {
      realUserAgent = win.navigator.userAgent;
    });
  });

  it('GET - List Users (Page 2)', () => {
    cy.request({
      method: 'GET',
      url: '/api/users?page=2',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('total');
      expect(response.body.data[0].last_name).to.eq('Lawson');
      expect(response.body.data[1].last_name).to.eq('Ferguson');
      
      const receivedCount = response.body.data.length;
      const totalCount = response.body.total;
      expect(receivedCount).to.be.lte(totalCount);

     expect(response.body.page).to.be.a('number');
     expect(response.body.per_page).to.be.a('number');
     expect(response.body.total).to.be.a('number');
      expect(response.body.total_pages).to.be.a('number');
      expect(response.body.data).to.be.an('array');
    });
  });
  
  usersData.forEach((user) => {
    it(`POST - Create User: ${user.name}`, () => {

      cy.request({
        method: 'POST',
        url: '/api/users',
        body: user,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then((response) => {

        expect(response.status).to.eq(201);

        expect(response.body).to.have.property('id');
        expect(response.body.id).to.not.be.empty;

        expect(response.body.name).to.eq(user.name);
        expect(response.body.job).to.eq(user.job);

        expect(response.duration).to.be.lessThan(4000);
        
        expect(response.body.id).to.be.a('string');
        expect(response.body.name).to.be.a('string');
        expect(response.body.job).to.be.a('string');
        expect(response.body.createdAt).to.be.a('string');
      });
    });
  });
});
