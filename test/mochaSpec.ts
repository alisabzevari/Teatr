import {expect} from "chai";

describe("Is mocha an chai work?", function () {
  it("should run a simple test", function () {
    expect(1 + 1).to.equal(2);
  });
  it("should fail with exception", function () {
    throw "Exception";
  });
  // it("should fail with a chai except", function () {
  //   expect(1 + 1).to.equal(3);
  // });
});