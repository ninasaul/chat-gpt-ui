describe("User Interface", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    // Check if the page has loaded successfully (Status code 200)
    cy.request("http://localhost:5173/").should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Check the headline", () => {
    cy.getDataTestId("HeaderTitle").contains(
      "K!mpuls, der datenschutzfreundliche Chatbot der FH Südwestfalen"
    );
  });
});

describe("Dark Mode", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Down Left Button", () => {
    cy.visit("http://localhost:5173/");
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(2).click();
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(2).click();
    cy.get("html").should("have.attr", "data-theme", "light");
  });

  it("Top Right Button", () => {
    cy.visit("http://localhost:5173/");
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.getDataTestId("TopRightDarkModeBtn").click();
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.getDataTestId("TopRightDarkModeBtn").click();
    cy.get("html").should("have.attr", "data-theme", "light");
  });

  it("In Settings", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(2000);
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(3).click();
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.getDataTestId("OptionDarkModeSelect").select("dark");
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.getDataTestId("OptionDarkModeSelect").select("light");
    cy.get("html").should("have.attr", "data-theme", "light");
  });
});

describe("User Information", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Open and close user information", () => {
    cy.getDataTestId("UserInformation").should("not.exist");
    cy.getDataTestId("UserInformationBtn").click();
    cy.getDataTestId("UserInformation").should("be.visible", "exist");
    cy.getDataTestId("UserInformationCloseBtn").click();
    cy.getDataTestId("UserInformation").should("not.exist");
  });
});

describe("Chat", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.getDataTestId("ChatTextArea").click().type("Cypress wrote this!");
    cy.getDataTestId("ChatTextArea").should("have.text", "Cypress wrote this!");
  });

  it("Sending a message with the send button", () => {
    cy.getDataTestId("SendMessageBtn").click();
    cy.getDataTestId("ChatTextArea").should("have.text", "");
    cy.getDataTestId("ChatListContainer").should("be.visible");
    cy.getDataTestId("ChatMessage").each((message) => {
      cy.wrap(message).should("contain.text", "Cypress wrote this!");
    });
  });

  it("Sending a message with enter", () => {
    cy.getDataTestId("ChatTextArea").click().type("{enter}");
    cy.getDataTestId("ChatTextArea").should("have.text", "");
    cy.getDataTestId("ChatListContainer").should("be.visible");
    cy.getDataTestId("ChatMessage").each((message) => {
      cy.wrap(message).should("contain.text", "Cypress wrote this!");
    });
  });

  it("Changing the message sending to ctrl+enter and sending it", () => {
    cy.wait(2000);
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(3).click();
    cy.getDataTestId("SendMessageSelect").select("COMMAND_ENTER");
    cy.getDataTestId("SettingsCloseBtn").click();
    cy.getDataTestId("ChatTextArea").click().type("{enter}");
    cy.getDataTestId("ChatTextArea").should("have.text", "Cypress wrote this!");
    cy.getDataTestId("ChatTextArea").click().type("{ctrl}{enter}");
    cy.getDataTestId("ChatTextArea").should("have.text", "");
    cy.getDataTestId("ChatMessage").each((message) => {
      cy.wrap(message).should("contain.text", "Cypress wrote this!");
    });
  });
});
