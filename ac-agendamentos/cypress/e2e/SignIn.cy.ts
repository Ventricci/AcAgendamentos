describe("SignIn", () => {
  it("should signIn and navigate to dashboard", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[id=email]").type("alexsander.ventricci@gmail.com");
    cy.get("input[id=password]").type("teste");
    cy.get("button[id=submit").click();
    cy.url().should("include", "/dashboard");
  });
  it("should not signIn and open error alert", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[id=email]").type("sadfasdf.fasdf@gmail.com");
    cy.get("input[id=password]").type("asdfasdf");
    cy.get("button[id=submit").click();
    cy.contains(
      "Houve um erro ao tentar se conectar, verifique os dados inseridos e tente novamente."
    );
  });
});
