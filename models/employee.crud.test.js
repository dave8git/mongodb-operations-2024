const Staff = require('./employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading records', () => {
    before(async () => {
      const memberOne = new Staff({
        firstName: 'Alice',
        lastName: 'Johnson',
        department: 'Development',
      });
      await memberOne.save();

      const memberTwo = new Staff({
        firstName: 'Bob',
        lastName: 'Smith',
        department: 'Sales',
      });
      await memberTwo.save();
    });

    it('should return all records using the "find" method', async () => {
      const staff = await Staff.find();
      expect(staff.length).to.be.equal(2);
    });

    it('should return the correct document by specific params with "findOne" method', async () => {
      const staff1 = await Staff.findOne({ firstName: 'Alice' });
      expect(staff1.firstName).to.be.equal('Alice');

      const staff2 = await Staff.findOne({ lastName: 'Smith' });
      expect(staff2.lastName).to.be.equal('Smith');

      const staff3 = await Staff.findOne({ department: 'Development' });
      expect(staff3.department).to.be.equal('Development');
    });

    after(async () => {
      await Staff.deleteMany();
    });
  });

  describe('Creating records', () => {
    it('should insert a new document with the "insertOne" method', async () => {
      const member = new Staff({
        firstName: 'Claire',
        lastName: 'Adams',
        department: 'HR',
      });
      await member.save();
      expect(member.isNew).to.be.false;
    });

    after(async () => {
      await Staff.deleteMany();
    });
  });

  describe('Updating records', () => {
    beforeEach(async () => {
      const memberOne = new Staff({
        firstName: 'David',
        lastName: 'Brown',
        department: 'Development',
      });
      await memberOne.save();

      const memberTwo = new Staff({
        firstName: 'Eve',
        lastName: 'Davis',
        department: 'Sales',
      });
      await memberTwo.save();
    });

    it('should update a single document with "updateOne" method', async () => {
      await Staff.updateOne({ lastName: 'Davis' }, { $set: { lastName: 'Davison' } });
      const updatedMember = await Staff.findOne({ lastName: 'Davison' });
      expect(updatedMember).to.not.be.null;
    });

    it('should update a single document with "save" method', async () => {
      const member = await Staff.findOne({ lastName: 'Davis' });
      member.lastName = 'Davison';
      await member.save();

      const updatedMember = await Staff.findOne({ lastName: 'Davison' });
      expect(updatedMember).to.not.be.null;
    });

    it('should update multiple documents with "updateMany" method', async () => {
      await Staff.updateMany({}, { $set: { department: 'Operations' } });
      const staff = await Staff.find({ department: 'Operations' });
      expect(staff.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Staff.deleteMany();
    });
  });

  describe('Removing records', () => {
    beforeEach(async () => {
      const memberOne = new Staff({
        firstName: 'George',
        lastName: 'Wilson',
        department: 'Finance',
      });
      await memberOne.save();

      const memberTwo = new Staff({
        firstName: 'Hannah',
        lastName: 'Lee',
        department: 'Support',
      });
      await memberTwo.save();
    });

    it('should remove a single document with "deleteOne" method', async () => {
      await Staff.deleteOne({ firstName: 'George' });
      const deletedMember = await Staff.findOne({ firstName: 'George' });
      expect(deletedMember).to.be.null;
    });

    it('should remove multiple documents with "deleteMany" method', async () => {
      await Staff.deleteMany();
      const remainingStaff = await Staff.find();
      expect(remainingStaff.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Staff.deleteMany();
    });
  });
});