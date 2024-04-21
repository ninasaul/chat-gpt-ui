describe("User Interface", () => {
  beforeEach(() => {

    cy.intercept('GET', 'https://openai.ki.fh-swf.de/api/user', { fixture: 'testUser.json' }).as('getUser');
    cy.visit("http://localhost:5173/");
    cy.wait('@getUser');
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
/*
  it.only('Check if headline is equal to the conversation', () => {
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(1).click();
    cy.getDataTestId("ConversationList").within(() => {
      cy.get('[data-testid="Conversation"]').eq(0).find('[data-testid="ConversationTitle"]').invoke("text").as("conversationText").then(() => {
        //cy.get('[data-testid="HeaderTitle"]').should("contain.text", conversationText); 
        cy.getDataTestId("HeaderTitle").get("text").as("headerText");
        cy.log(this.headerText);
      });
    });
  });
*/
  it("Hide and show the conversation sidebar", () => {
    cy.getDataTestId("ConversationSideBar").should("exist");
    cy.getDataTestId("ConversationSideBarBtn").click();
    cy.getDataTestId("ConversationSideBar").should("not.exist");
    cy.getDataTestId("ConversationSideBarBtn").click();
    cy.getDataTestId("ConversationSideBar").should("exist");
  });

  it("Switching between Apps and History", () => {
    cy.getDataTestId("AppsList").should("exist", "be.visible");
    cy.getDataTestId("ConversationList").should("not.exist");
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(1).click();
    cy.getDataTestId("AppsList").should("not.exist");
    cy.getDataTestId("ConversationList").should("exist", "be.visible");
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(0).click();
    cy.getDataTestId("ConversationList").should("not.exist");
    cy.getDataTestId("AppsList").should("exist", "be.visible");
  });

  it("Conversation search bar input works", () => {
    cy.getDataTestId("ConversationSearchBar").find('input').should('exist').then(($input) => {
      cy.wrap($input).type("search input works").should("have.value", "search input works");
    });
  });

  it("Create and edit new conversation", () => {
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(1).click();
    cy.getDataTestId("ConversationCreateBtn").click();
    cy.getDataTestId("HeaderTitle").contains("Dies ist ein neues Gespräch");
    cy.getDataTestId("ConversationList").within(() => {
      cy.get('[data-testid="Conversation"]').eq(0).find('[data-testid="ConversationTitle"]').contains("Dies ist ein neues Gespräch"); 
      cy.getDataTestId("editConversation").find("i").eq(0).click({ force: true });
      cy.getDataTestId("editConversationTextArea").find("textarea").clear().type("edit conversation text");
      cy.getDataTestId("editConversationSaveBtn").click();
      cy.get('[data-testid="Conversation"]').eq(0).find('[data-testid="ConversationTitle"]').contains("edit conversation text");
    });
    cy.getDataTestId("HeaderTitle").contains("edit conversation text");
  });

  it("Show infos", () => {
    cy.getDataTestId("InformationWindow").should("not.exist");
    cy.getDataTestId("LeftSideBar").find("i").eq(0).click(); //Clicks the Info with the ?
    cy.getDataTestId("InformationWindow").should("be.visible");
    cy.getDataTestId("InformationWindow").should("exist");
  });
});

describe("Dark Mode", () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://openai.ki.fh-swf.de/api/user', { fixture: 'testUser.json' }).as('getUser');
    cy.visit("http://localhost:5173/");
    cy.wait('@getUser');
  });

  it("Down Left Button", () => {
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(2).click();
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.getDataTestId("BottomLeftSideBar").find("i").eq(2).click();
    cy.get("html").should("have.attr", "data-theme", "light");
  });

  it("Top Right Button", () => {
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.getDataTestId("TopRightDarkModeBtn").click();
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.getDataTestId("TopRightDarkModeBtn").click();
    cy.get("html").should("have.attr", "data-theme", "light");
  });

  it("In Settings", () => {
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
    cy.intercept('GET', 'https://openai.ki.fh-swf.de/api/user', { fixture: 'testUser.json' }).as('getUser');
    cy.visit("http://localhost:5173/");
    cy.wait('@getUser');
  });

  it("Open and close user information", () => {
    cy.getDataTestId("UserInformation").should("not.exist");
    cy.getDataTestId("UserInformationBtn").click();
    cy.getDataTestId("UserInformation").should("be.visible", "exist");
    cy.getDataTestId("UserInformationCloseBtn").click();
    cy.getDataTestId("UserInformation").should("not.exist");
  });
});