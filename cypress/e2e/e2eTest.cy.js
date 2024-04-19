describe("Chat", () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://openai.ki.fh-swf.de/api/user', { fixture: 'testUser.json' }).as('getUser');
      cy.visit("http://localhost:5173/");
      cy.wait('@getUser');
      cy.wait(2000)

      cy.intercept('POST', 'https://openai.ki.fh-swf.de/api/v1/chat/completions', (req) => {
        const fakeResponseData = [
          {
            "id": "chatcmpl-9FNy2VTHzcWXJUkKXOholEKFNV5MO",
            "object": "chat.completion.chunk",
            "created": 1713454078,
            "model": "gpt-4-0125-preview",
            "system_fingerprint": "fp_1d2ae78ab7",
            "choices": [
              { "index": 0, "delta": { "role":"assistant", "content": "" }, "logprobs": null, "finish_reason": null }
            ]
          },
          {
            "id": "chatcmpl-9FNy2VTHzcWXJUkKXOholEKFNV5MO",
            "object": "chat.completion.chunk",
            "created": 1713454078,
            "model": "gpt-4-0125-preview",
            "system_fingerprint": "fp_1d2ae78ab7",
            "choices": [
              { "index": 0, "delta": { "content": "It" }, "logprobs": null, "finish_reason": null }
            ]
          },
          {
            "id": "chatcmpl-9FNy2VTHzcWXJUkKXOholEKFNV5MO",
            "object": "chat.completion.chunk",
            "created": 1713454078,
            "model": "gpt-4-0125-preview",
            "system_fingerprint": "fp_1d2ae78ab7",
            "choices": [
              { "index": 0, "delta": { "content": "looks" }, "logprobs": null, "finish_reason": "stop" }
            ]
          },
        ];

        fakeResponseData.push("data: [DONE]");

        req.reply({
          statusCode: 200,
          body: fakeResponseData
        });
      }).as("messageResponse");

      cy.getDataTestId("ChatTextArea").click().type("Cypress wrote this!").should("have.text", "Cypress wrote this!");
    });

    it("Sending a message with the send button", () => {
      cy.getDataTestId("SendMessageBtn").click();
      cy.wait("@messageResponse");
      cy.getDataTestId("ChatTextArea").should("have.text", "");
      cy.getDataTestId("ChatListContainer").should("be.visible");
      cy.getDataTestId("ChatMessage").each((message) => {
        cy.wrap(message).should("contain.text", "Cypress wrote this!");
      });
    });

    it("Sending 2 messages and checking if both are in the chat", () => {
      cy.getDataTestId("SendMessageBtn").click();
      //cy.getDataTestId("ChatTextArea").should("have.text", "");
      cy.wait(2000);
      cy.getDataTestId("ChatListContainer").should("be.visible");
      cy.getDataTestId("ChatMessage").each((message) => {
        cy.wrap(message).should("contain.text", "Cypress wrote this!");
      });
      cy.getDataTestId("ChatTextArea").click().type("Cypress also wrote this!");
      cy.getDataTestId("ChatTextArea").should(
        "have.text",
        "Cypress also wrote this!"
      );
      cy.getDataTestId("SendMessageBtn").click();
      cy.getDataTestId("ChatTextArea").should("have.text", "");
      cy.getDataTestId("ChatListContainer").should("be.visible");
  
      cy.getDataTestId("ChatListContainer").within(() => {
        // Überprüfe die erste Nachricht
        cy.getDataTestId("ChatMessage")
          .eq(0)
          .should("contain", "Cypress wrote this!");
  
        // Überprüfe die zweite Nachricht
        cy.getDataTestId("ChatMessage")
          .eq(1)
          .should("contain", "Cypress also wrote this!");
      });
    });

    it("Sending a message with enter", () => {
      cy.getDataTestId("ChatTextArea").click().type("{enter}");
      //cy.getDataTestId("ChatTextArea").should("have.text", "");
      cy.wait(2000);
      cy.getDataTestId("ChatListContainer").should("be.visible");
      cy.getDataTestId("ChatMessage").each((message) => {
        cy.wrap(message).should("contain.text", "Cypress wrote this!");
      });
    });
  
    it("Changing the message sending to ctrl+enter and sending it", () => {
      // Change message sending method to use ctrl+enter
      cy.getDataTestId("BottomLeftSideBar").find("i").eq(3).click();
      cy.getDataTestId("SendMessageSelect").select("COMMAND_ENTER");
      cy.getDataTestId("SettingsCloseBtn").click();
  
      // Try sending message using Enter
      cy.getDataTestId("ChatTextArea").click().type("{enter}").should("have.text", "Cypress wrote this!");
  
      // Send message using ctrl+Enter
      cy.getDataTestId("ChatTextArea").click().type("{ctrl}{enter}").should("have.text", "");
  
      // Check if the message has been sent
      cy.getDataTestId("ChatMessage").each((message) => {
        cy.wrap(message).should("contain.text", "Cypress wrote this!");
      });
    });
  
    it("Sending a message and clearing the chatlog", () => {
      // Send message
      cy.getDataTestId("SendMessageBtn").click();
      cy.getDataTestId("ChatListContainer").find('[data-testid="ChatMessage"]').should('exist');
    
      // Clear chatlog
      cy.getDataTestId("ClearMessageBtn").click();
      cy.getDataTestId("ChatListContainer").should('not.exist');
    
      // Check if message can be sent again
      const message = "Cypress wrote this!";
      cy.getDataTestId("ChatTextArea").type(message).should("have.value", message);
      cy.getDataTestId("SendMessageBtn").click();
      cy.getDataTestId("ChatListContainer").should('exist');
    });
    
  });
  