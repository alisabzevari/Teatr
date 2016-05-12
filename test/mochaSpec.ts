import {expect} from "chai";

describe("Is mocha an chai work?", function () {
  it("should run a simple test", function () {
    expect(1 + 1).to.equal(2);
  });
});