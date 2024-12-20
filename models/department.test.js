const Department = require('./department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Department', () => {
    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value
        const err = dep.validateSync();
        expect(err.errors.name).to.exist;
    });

    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const dep = new Department({ name });
            const err = dep.validateSync();
            expect(err.errors.name).to.exist;
        }
    });

    it('should throw an error if "name" is too short or too long', () => {
        const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // some names too short, some too long
        for (let name of cases) {
            const dep = new Department({ name });
            const err = dep.validateSync();
            expect(err.errors.name).to.exist;
        }
    });

    it('should not throw an error if "name" is okay', () => {
        const cases = ['Management', 'Human Resources'];
        for (let name of cases) {
            const dep = new Department({ _id: new mongoose.Types.ObjectId(), name });
            const err = dep.validateSync();
            expect(err).to.not.exist;
        }
    });
});