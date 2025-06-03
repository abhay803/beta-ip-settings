/// <reference types="cypress" />

describe("Admin Security Feature – IP Whitelisting", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    // Clear localStorage before each test to ensure a clean state
    cy.window().then((win) => win.localStorage.clear());
  });

  it("renders the main UI and default mode is whitelist", () => {
    cy.contains("Network Security Settings");
    cy.get('input[type="radio"][value="whitelist"]').should("be.checked");
    cy.contains("Trusted IP Addresses (CIDR format)");
  });

  it("can add and remove IP fields", () => {
    cy.contains("+ Add IP").click();
    cy.get('input[placeholder="e.g. 192.168.1.0/24"]').should("have.length", 2);
    cy.get("button").contains("Remove").last().click();
    cy.get('input[placeholder="e.g. 192.168.1.0/24"]').should("have.length", 1);
  });

  it("shows configuration flow diagram", () => {
    cy.get(".react-flow__renderer").should("exist");
    cy.contains("Configuration Flow");
  });
});
