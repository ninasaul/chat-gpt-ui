import React, { useState, useEffect } from "react";
import { Modal, Button } from "@/components";
import { Form, Input, Select, Divider } from "antd";
import { auth } from "../context/firebase";
import styles from "./CreateProfileModal.module.less";

const { TextArea } = Input;

export function CreateProfileModal({ visible, onClose }) {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasProfile, setHasProfile] = useState(false);

  const checkAndLoadProfile = async () => {
    const user = auth.currentUser;
    if (user && visible) {
      try {
        const response = await fetch(`http://localhost:3001/api/profiles/check/${user.uid}`);
        const data = await response.json();
        setHasProfile(data.exists);
        
        if (data.exists) {
          const profileResponse = await fetch(`http://localhost:3001/api/profiles/${user.uid}`);
          const profileData = await profileResponse.json();
          if (profileData.success) {
            form.setFieldsValue(profileData.profile);
          }
        }
      } catch (error) {
        console.error('Error checking/loading profile:', error);
      }
    }
  };

  useEffect(() => {
    checkAndLoadProfile();
  }, [visible, form]);

  const handleUpdateProfile = async (values) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("No user is currently signed in");
        return;
      }

      // Transform the values according to the schema
      const transformedValues = {
        ...values,
        uid: user.uid,
        email: user.email,
        // expertise_topics: values.expertise_topics ? values.expertise_topics.split(',').map(s => s.trim()) : [],
        // hobbies_interests: values.hobbies_interests ? values.hobbies_interests.split(',').map(s => s.trim()) : [],
        // preferred_channels: values.preferred_channels ? values.preferred_channels.split(',').map(s => s.trim()) : [],
      };

      console.log('Sending profile update with data:', transformedValues);

      // Save profile data to MongoDB
      const response = await fetch('http://localhost:3001/api/profiles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedValues),
      });

      console.log('Profile update response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Profile update failed:', errorData);
        throw new Error(errorData.error || 'Failed to save profile data');
      }

      const data = await response.json();
      console.log('Profile saved to MongoDB:', data);

      setSuccess(hasProfile ? "Profile updated successfully!" : "Profile created successfully!");
      
      // Wait a bit before closing to show the success message
      setTimeout(() => {
        form.resetFields();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} title={hasProfile ? "Edit Profile" : "Create Profile"}>
      <div className={styles.profileContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          className={styles.form}
        >
          {/* Basic Information */}
          <Divider orientation="left">Basic Information</Divider>
          <Form.Item
            name="persona_name"
            label="Name"
            rules={[
              {
                required: true,
                min: 2,
                message: "Name must be at least 2 characters.",
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="business_description"
            label="Tell us about your business/company"
            rules={[
              {
                required: true,
                min: 10,
                message: "Description must be at least 10 characters.",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Tell us about your business/company"
            />
          </Form.Item>

          {/* Location Information */}
          <Divider orientation="left">Location</Divider>
          <Form.Item name="location" label="Location">
            <Input placeholder="Enter location" />
          </Form.Item>

          {/* Professional Information */}
          <Divider orientation="left">Professional Information</Divider>
          <Form.Item name="job_title" label="Job Title">
            <Input placeholder="Enter job title" />
          </Form.Item>

          <Form.Item name="industry" label="Industry">
            <Input placeholder="Enter industry" />
          </Form.Item>

          <Form.Item name="company_size" label="Company Size">
            <Select 
              placeholder="Select company size" 
              style={{ 
                color: 'white',
              }}
              dropdownStyle={{ backgroundColor: 'white', color: 'black' }}
              className={styles.selectInput}
            >
              <Select.Option value="startup">Startup</Select.Option>
              <Select.Option value="small">Small</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="large">Large</Select.Option>
            </Select>
          </Form.Item>

          {/* Preferences */}
          <Divider orientation="left">Preferences</Divider>
          <Form.Item
            name="product_objective"
            label="Objective/Intention to use this product"
          >
            <TextArea
              rows={4}
              placeholder="Enter your objectives and intentions for using this product"
            />
          </Form.Item>

          {/* Expertise & Interests */}
          <Divider orientation="left">Expertise & Interests</Divider>
          <Form.Item
            name="expertise_topics"
            label="Expertise Topics (comma-separated)"
          >
            <Input placeholder="Enter expertise topics, separated by commas" />
          </Form.Item>

          <Form.Item
            name="hobbies_interests"
            label="Hobbies & Interests (comma-separated)"
          >
            <Input placeholder="Enter hobbies and interests, separated by commas" />
          </Form.Item>

          {/* Goals */}
          <Divider orientation="left">Goals</Divider>
          <Form.Item name="short_term_goals" label="Short Term Goals">
            <TextArea rows={4} placeholder="Enter short term goals" />
          </Form.Item>

          <Form.Item name="long_term_goals" label="Long Term Goals">
            <TextArea rows={4} placeholder="Enter long term goals" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmltype="submit"
              className={styles.createProfileButton}
              style={{
                backgroundColor: "#1890ff",
                width: "200px",
                height: "40px"
              }}
            >
              {hasProfile ? 'Save Changes' : 'Create Profile'}
            </Button>
          </Form.Item>
        </Form>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </div>
    </Modal>
  );
}