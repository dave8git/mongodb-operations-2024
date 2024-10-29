const chai = require('chai');
const chaiHttp = require('chai-http');
const Department = require('../../../../models/department.model.js');
const server = require('../../../../server.js');
chai.use(chaiHttp);

const { expect } = chai;
const { request } = chai;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepartment = new Department({
      _id: '5d9f1140f10a81216cfd4408',
      name: 'Department #1',
    });
    await testDepartment.save();
  });

  it('/:id should delete the specified document and return success', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const deletedDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(deletedDepartment).to.be.null;
  });
  
  after(async () => {
    await Department.deleteMany();
  });
});
