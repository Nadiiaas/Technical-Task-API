const usersData = require('../fixtures/users.json');

describe('API Task', () => {

  it('GET - List Users', () => {

    cy.request('GET', '/api/users?page=2').then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('total');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');

      expect(response.body.data[0].last_name).to.eq('Lawson');
      expect(response.body.data[1].last_name).to.eq('Ferguson');

      const dataCount = response.body.data.length;
      const totalCount = response.body.total;
      expect(dataCount).to.be.lte(totalCount);

      expect(response.body.page).to.be.a('number');
    });
  });

  usersData.forEach((user) => {
    it(`POST - Create User: ${user.name}`, () => {

      const limit = 1000; 

      cy.request('POST', '/api/users', user).then((response) => {

        expect(response.status).to.eq(201);

        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');

        expect(response.body.name).to.eq(user.name);
        expect(response.body.job).to.eq(user.job);

        expect(response.duration).to.be.lessThan(limit);
      });
    });
  });
});
