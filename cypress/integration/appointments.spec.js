const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {
  //grouping the visit and Monday within beforeEach will group in cypress too
  
  beforeEach(() => {
    //resets the api and will animate over and over after each change
   cy.request("GET", "/api/debug/reset");
 
   cy.visit("/");
 
   cy.contains("Monday");
  });
 

//cypress will have this as TEST BODY after beforeEach block
  it("should book an interview", () => {
   cy.get("[alt=Add]")
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
 
   cy.contains("Save").click();
 
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  //edit interview
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

  cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
  cy.get("[alt='Tori Malcolm']").click();

  cy.contains("Save").click();

  cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  //cancel interview
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

 });


// refactored into the answer above to incl beforeEach 
// describe("Appointment", () => {
//   it("should book an interview", () => {
//     //resets the api and will animate over and over after each change
//     cy.request("GET", "/api/debug/reset")
//     cy.visit("/");
//     cy.contains("[data-testid=day]", "Monday")
//     cy.get("[alt=Add]")
//       .first()
//       .click();
//     cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
//     cy.get("[alt='Sylvia Palmer']").click();
//     cy.contains("Save").click();

//     cy.contains(".appointment__card--show", "Lydia Miller-Jones");
//     cy.contains(".appointment__card--show", "Sylvia Palmer");
//   });

// });