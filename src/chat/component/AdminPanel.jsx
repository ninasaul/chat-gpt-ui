import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Icon } from "@/components";
import { auth } from "../context/firebase";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import styles from "./AdminPanel.module.less";

export function AdminPanel({ visible, onClose }) {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch users list (Note: This requires Firebase Admin SDK setup)
  useEffect(() => {
    if (visible) {
      // TODO: Implement fetching users list when Firebase Admin is set up
      // For now, we'll show a placeholder
      setUsers([
        { email: "admin@example.com", role: "admin", id: '1' },
        { email: "user@example.com", role: "user", id: '2' }
      ]);
    }
  }, [visible]);

  const handleSendInvite = async () => {
    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      setSuccess(`Invitation sent to ${email}`);
      setEmail("");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Admin Panel">
      <div className={styles.adminContainer}>
        {/* Invite Users Section */}
        <div className={styles.section}>
          <h3>Invite New Users</h3>
          <div className={styles.inviteForm}>
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e)}
              type="email"
            />
            <Button onClick={handleSendInvite} type="primary">
              Send Invite
            </Button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
        </div>

        {/* Users List Section */}
        <div className={styles.section}>
          <h3>Existing Users</h3>
          <div className={styles.usersList}>
            {users.map(user => (
              <div key={user.id} className={styles.userItem}>
                <div className={styles.userInfo}>
                  <span className={styles.userEmail}>{user.email}</span>
                  <span className={styles.userRole}>{user.role}</span>
                </div>
                <Button
                  type="text"
                  onClick={() => console.log("Remove user:", user.email)}
                  className={styles.removeButton}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
} 