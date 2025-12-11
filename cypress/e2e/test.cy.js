const usersData = require('../fixtures/users.json');

describe('Technical Task', () => {
  
  let realUserAgent = '';

  beforeEach(() => {

    cy.visit('/');
    
    cy.get('.logo', { timeout: 30000 }).should('be.visible');

    cy.window().then((win) => {
      realUserAgent = win.navigator.userAgent;
    });
  });

  it('GET - List Users (Page 2)', () => {
    cy.request({
      method: 'GET',
      url: '/api/users?page=2',
      headers: {
        'User-Agent': realUserAgent
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('total');
      expect(response.body.data[0].last_name).to.eq('Lawson');
      
      const receivedCount = response.body.data.length;
      const totalCount = response.body.total;
      expect(receivedCount).to.be.lte(totalCount);

      expect(response.body.page).to.be.a('number');
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
          'User-Agent': realUserAgent
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.eq(user.name);
        expect(response.body.job).to.eq(user.job);
        
        expect(response.duration).to.be.lessThan(4000);
      });
    });
  });
});
