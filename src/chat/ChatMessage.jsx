import React, { useState, useEffect } from "react";
import {
  Avatar,
  Icon,
  Textarea,
  Loading,
  Tooltip,
  Button,
  Popover,
} from "@/components";
import { CopyIcon, ScrollView, Error, EmptyChat, ChatHelp } from "./component";
import { MessageRender } from "./MessageRender";
import { ConfigInfo } from "./ConfigInfo";
import { useGlobal } from "./context";
import { useMesssage, useSendKey, useOptions } from "./hooks";
import { dateFormat } from "./utils";
import avatar from "@/assets/images/avatar-gpt.png";
import styles from "./style/message.module.less";
import { classnames } from "../components/utils";
import { AuthModal } from "./component/AuthModal";
import { AdminPanel } from "./component/AdminPanel";
import { CreateProfileModal } from "./component/CreateProfileModal";
import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./context/firebase.js";
import { sendChatMessage } from './service/chat';
// import { insertToMongoDB } from './service/mongodb';
 
export function MessageHeader() {
  const { is, setIs, clearMessage, options } = useGlobal();
  const { message } = useMesssage();
  const { messages = [] } = message || {};
  const columnIcon = is.sidebar ? "column-close" : "column-open";
  const { setGeneral } = useOptions();

  const { currentUser } = useAuth();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const [createProfileModalVisible, setCreateProfileModalVisible] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const checkUserProfile = async () => {
    if (currentUser) {
      try {
        const response = await fetch(`http://localhost:3001/api/profiles/check/${currentUser.uid}`);
        const data = await response.json();
        setHasProfile(data.exists);
      } catch (error) {
        console.error('Error checking profile:', error);
        setHasProfile(false);
      }
    }
  };

  useEffect(() => {
    checkUserProfile();
  }, [currentUser, createProfileModalVisible]); // Add createProfileModalVisible as dependency

  const handleLoginClick = () => {
    setAuthModalVisible(true);
  };

  const handleSignUpSuccess = () => {
    setCreateProfileModalVisible(true);
  };

  const handleProfileModalClose = () => {
    setCreateProfileModalVisible(false);
    checkUserProfile(); // Check profile status after modal closes
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Check if user is admin (you'll need to implement this based on your user roles system)
  const isAdmin = currentUser?.email === "admin@example.com"; // Replace with your admin check logic

  const handleAdminPanelClick = () => {
    setAdminPanelVisible(true);
  };

    const handleInsert = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/insert", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            message: "Test message",
            timestamp: new Date(),
            userId: currentUser?.uid || "anonymous"
          })
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error);
        }
        console.log("Successfully inserted document:", data.result);
      } catch (error) {
        console.error("Failed to insert document:", error);
      }
    };

  return (
    <div className={classnames(styles.header)}>
      <Button
        type="icon"
        icon={columnIcon}
        onClick={() => setIs({ sidebar: !is.sidebar })}
      />
      {/* <Button type="icon" icon={columnIcon} onClick={handleInsert} /> */}
      <div className={styles.header_title}>
        {message?.title}
        <div className={styles.length}>{messages.length} messages</div>
      </div>
      <div className={styles.header_bar}>

        {currentUser && (
          <div style={{ marginRight: '10px' }}>
          <Button
            type="primary"
            onClick={() => setCreateProfileModalVisible(true)}
            className={styles.createProfileButton}
          >
            {hasProfile ? 'Edit Profile' : 'Create Profile'}
          </Button>
          </div>
        )}
        {currentUser ? (
          <div className={styles.userInfo}>
            <Avatar src={currentUser.photoURL || avatar} size={32} />
            <span className={styles.userName}>
              {currentUser.displayName || currentUser.email}
            </span>
            {isAdmin && (
              <Button
                type="text"
                onClick={handleAdminPanelClick}
                className={styles.adminButton}
              >
                Admin Panel
              </Button>
            )}
            <Button type="text" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button type="primary" onClick={handleLoginClick}>
            Login
          </Button>
        )}

        <Icon
          className={styles.icon}
          type={options.general.theme}
          onClick={() =>
            setGeneral({
              theme: options.general.theme === "light" ? "dark" : "light",
            })
          }
        />
        <Icon className={styles.icon} type="clear" onClick={clearMessage} />
        <Icon
          className={styles.icon}
          type="more"
          onClick={handleAdminPanelClick}
        />
        <Icon type="download" className={styles.icon} />
      </div>
      <AuthModal
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
        onSignUpSuccess={handleSignUpSuccess}
      />
      <AdminPanel
        visible={adminPanelVisible}
        onClose={() => setAdminPanelVisible(false)}
      />
      <CreateProfileModal
        visible={createProfileModalVisible}
        onClose={handleProfileModalClose}
      />
    </div>
  );
}

export function EditorMessage() {
  return (
    <div>
      <Textarea rows="3" />
    </div>
  );
}

export function MessageItem(props) {
  const { content, sentTime, role } = props;
  const { removeMessage } = useGlobal();
  return (
    <div className={classnames(styles.item, styles[role])}>
      <Avatar src={role !== "user" && avatar} />
      <div className={classnames(styles.item_content, styles[`item_${role}`])}>
        <div className={styles.item_inner}>
          <div className={styles.item_tool}>
            {/* <div className={styles.item_date}>{dateFormat(sentTime)}</div> */}
            <div className={styles.item_bar}>
              {/* <Tooltip text="Remove Messages">
                <Icon
                  className={styles.icon}
                  type="trash"
                  onClick={removeMessage}
                />
              </Tooltip> */}
              {role === "user" ? (
                <React.Fragment>
                  <Icon className={styles.icon} type="reload" />
                  <Icon className={styles.icon} type="editor" />
                </React.Fragment>
              ) : (
                <CopyIcon value={content} />
              )}
            </div>
          </div>
          <MessageRender>{content}</MessageRender>
        </div>
      </div>
    </div>
  );
}

export function MessageBar() {
  const {
    sendMessage,
    setMessage,
    is,
    options,
    setIs,
    typeingMessage,
    clearTypeing,
    stopResonse,
    setState,
    chat,
    currentChat
  } = useGlobal();
  const { message } = useMesssage();
  const { messages = [] } = message || {};

  const { currentUser } = useAuth();

  const handleSendMessage = async () => {
    console.log({typeingMessage});
    if (!typeingMessage?.content) return;
    
    try {
      setIs({ thinking: true });
      
      // Create a new message object for the user's message
      const userMessage = {
        role: 'user',
        content: typeingMessage.content,
        sentTime: new Date().toISOString(),
        id: Date.now(),
        uid: currentUser?.uid || 'anonymous',
        userEmail: currentUser?.email || 'anonymous',
        persona: chat[currentChat]?.persona || null // Add persona information
      };
      
      // Create assistant message object
      const assistantMessage = {
        role: 'assistant',
        content: 'Thinking...',
        sentTime: new Date().toISOString(),
        id: Date.now() + 1,
        uid: currentUser?.uid || 'anonymous',
        userEmail: currentUser?.email || 'anonymous',
        persona: chat[currentChat]?.persona || null // Add persona information
      };

      // Update chat with both messages immediately
      const updatedMessages = [...messages, userMessage, assistantMessage];
      const updatedChat = [...chat];
      updatedChat[currentChat] = {
        ...chat[currentChat],
        messages: updatedMessages
      };
      
      setState({ chat: updatedChat });
      clearTypeing(); // Clear input immediately

      // Get context messages for the API
      const contextMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message to context
      contextMessages.push({
        role: userMessage.role,
        content: userMessage.content
      });
      
      try {
        await sendChatMessage(
          typeingMessage.content,
          contextMessages,
          async (response) => {
            if (response) {
              // Create final assistant message with the response
              const finalAssistantMessage = {
                ...assistantMessage,
                content: response
              };

              // Store both user and assistant messages after getting the response
              try {
                // Store user message first
                const userResponse = await fetch("http://localhost:3001/api/chats/store", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    ...userMessage,
                    conversationId: currentChat,
                    timestamp: new Date().toISOString()
                  })
                });
                
                if (!userResponse.ok) {
                  throw new Error('Failed to store user message');
                }
                
                console.log('User message stored successfully');

                // Then store assistant message
                const assistantResponse = await fetch("http://localhost:3001/api/chats/store", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    ...finalAssistantMessage,
                    conversationId: currentChat,
                    timestamp: new Date().toISOString()
                  })
                });
                
                if (!assistantResponse.ok) {
                  throw new Error('Failed to store assistant message');
                }
                
                console.log('Assistant message stored successfully');
              } catch (error) {
                console.error("Failed to store messages:", error);
              }

              // Update the assistant message with the response
              const latestMessages = [...messages, userMessage, finalAssistantMessage];
              
              const newChat = [...chat];
              newChat[currentChat] = {
                ...chat[currentChat],
                messages: latestMessages
              };
              
              setState({ chat: newChat });
            }
          },
          chat[currentChat]?.persona // Pass the current chat's persona
        );
      } catch (error) {
        console.error('Chat error:', error);
      }
      
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIs({ thinking: false });
    }
  };

  useSendKey(handleSendMessage, options.general.command);
  
  return (
    <div className={styles.bar}>
      {is.thinking && (
        <div className={styles.bar_tool}>
          <div className={styles.bar_loading}>
            <div className="flex-c">
              <span>Thinking</span> <Loading />
            </div>
            <Button
              size="min"
              className={styles.stop}
              onClick={stopResonse}
              icon="stop"
            >
              Stop Response
            </Button>
          </div>
        </div>
      )}
      <div className={styles.bar_inner}>
        <div className={styles.bar_type}>
          <Textarea
            transparent={true}
            rows="3"
            value={typeingMessage?.content || ""}
            onFocus={() => setIs({ inputing: true })}
            onBlur={() => setIs({ inputing: false })}
            placeholder="Enter something...."
            onChange={(value) => setMessage(value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent default to avoid new line
                handleSendMessage();
              }
            }}
          />
        </div>
        <div className={styles.bar_icon}>
          {typeingMessage?.content && (
            <Tooltip text="clear">
              <Icon
                className={styles.icon}
                type="cancel"
                onClick={clearTypeing}
              />
            </Tooltip>
          )}
          <Tooltip text="history">
            <Icon className={styles.icon} type="history" />
          </Tooltip>
          <Icon className={styles.icon} type="send" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export function MessageContainer() {
  const { message } = useMesssage();
  const { messages = [] } = message || {};
  return (
    <React.Fragment>
      {messages.length ? (
        <div className={styles.container}>
          {messages.map((item, index) => (
            <MessageItem key={index} {...item} />
          ))}
        </div>
      ) : (
        <ChatHelp />
      )}
    </React.Fragment>
  );
}

export function ChatMessage() {
  const { is } = useGlobal();
  return (
    <React.Fragment>
      <div className={styles.message}>
        <MessageHeader />
        <ScrollView>
          <MessageContainer />
          {is.thinking && <Loading />}
        </ScrollView>
        <MessageBar />
      </div>
    </React.Fragment>
  );
}
