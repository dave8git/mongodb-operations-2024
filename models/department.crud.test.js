const Department = require("./department.model.js");
const { expect } = require("chai");

describe("Department", () => {
  it('should throw an error if no "name" argument is provided', async () => {
    const department = new Department({});

    department.validateSync((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const invalidValues = [{}, []];
    invalidValues.forEach((name) => {
      const department = new Department({ name });

      department.validateSync((err) => {
        expect(err.errors.name).to.exist;
      });
    });
  });

  it('should throw an error if "name" is too short or too long', () => {
    const invalidNames = ["Abc", "abcd", "Lorem Ipsum, Lorem Ip"];
    invalidNames.forEach((name) => {
      const department = new Department({ name });

      department.validateSync((err) => {
        expect(err.errors.name).to.exist;
      });
    });
  });

  it("should not throw an error if 'name' is valid", () => {
    const validNames = ["Wiktoria"];
    validNames.forEach((name) => {
      const department = new Department({ name });

      department.validateSync((err) => {
        expect(err?.errors.name).to.not.exist;
      });
    });
  });
});