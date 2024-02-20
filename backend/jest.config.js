/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};
