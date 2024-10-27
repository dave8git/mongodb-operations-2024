const Employee = require('./employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no argument is provided', async () => {
    const employee = new Employee({});

    employee.validateSync((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if "firstName", "lastName", or "department" is not a string', () => {
    const invalidValues = [{}, []];

    invalidValues.forEach((value) => {
      const employee = new Employee({ firstName: value, lastName: value, department: value });

      employee.validateSync((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    });
  });

  it('should not throw an error if valid data is provided', () => {
    const validData = { firstName: 'Wiktoria', lastName: 'Bulanda', department: 'IT' };
    const employee = new Employee(validData);

    employee.validateSync((err) => {
      expect(err.errors.firstName).to.not.exist;
      expect(err.errors.lastName).to.not.exist;
      expect(err.errors.department).to.not.exist;
    });
  });
});