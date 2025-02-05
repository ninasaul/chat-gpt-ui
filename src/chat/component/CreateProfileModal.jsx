import React, { useState } from "react";
import { Modal, Button, Avatar } from "@/components";
import { Form, Input, Select, Switch, Upload, Divider } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { auth } from "../context/firebase";
import { updateProfile } from "firebase/auth";
import styles from "./CreateProfileModal.module.less";

const { TextArea } = Input;

export function CreateProfileModal({ visible, onClose }) {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        persona_traits: values.persona_traits?.split(',').map(s => s.trim()),
        expertise_topics: values.expertise_topics?.split(',').map(s => s.trim()),
        hobbies_interests: values.hobbies_interests?.split(',').map(s => s.trim()),
        response_behavior: values.response_behavior?.split(',').map(s => s.trim()),
        knowledge_base: values.knowledge_base?.split(',').map(s => s.trim()),
        memory_settings: values.memory_settings?.split(',').map(s => s.trim()),
        buying_motivation: values.buying_motivation?.split(',').map(s => s.trim()),
        preferred_channels: values.preferred_channels?.split(',').map(s => s.trim()),
      };

      // TODO: Implement the actual profile update logic here
      console.log('Transformed values:', transformedValues);

      setSuccess("Profile updated successfully!");
      form.resetFields();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Create Profile">
      <div className={styles.profileContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          className={styles.form}
        >
          {/* Persona Details */}
          <Divider orientation="left">Persona Details</Divider>
          <Form.Item
            name="persona_name"
            label="Name"
            rules={[{ required: true, min: 2, message: "Name must be at least 2 characters." }]}
          >
            <Input placeholder="Enter persona name" />
          </Form.Item>

          <Form.Item
            name="persona_role"
            label="Role"
            rules={[{ required: true, min: 2, message: "Role must be at least 2 characters." }]}
          >
            <Input placeholder="Enter persona role" />
          </Form.Item>

          <Form.Item
            name="persona_traits"
            label="Traits (comma-separated)"
          >
            <Input placeholder="Enter traits, separated by commas" />
          </Form.Item>

          <Form.Item
            name="persona_bio"
            label="Bio"
            rules={[{ required: true, min: 10, message: "Bio must be at least 10 characters." }]}
          >
            <TextArea rows={4} placeholder="Enter persona bio" />
          </Form.Item>

          <Form.Item name="persona_pronouns" label="Pronouns">
            <Select placeholder="Select pronouns">
              <Select.Option value="he/him">He/Him</Select.Option>
              <Select.Option value="she/her">She/Her</Select.Option>
              <Select.Option value="they/them">They/Them</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="profile_picture" label="Profile Picture">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="avatar_description" label="Avatar Description">
            <Input placeholder="Describe your avatar" />
          </Form.Item>

          {/* Communication Style */}
          <Divider orientation="left">Communication Style</Divider>
          <Form.Item name="tone" label="Tone">
            <Select placeholder="Select tone">
              <Select.Option value="formal">Formal</Select.Option>
              <Select.Option value="casual">Casual</Select.Option>
              <Select.Option value="friendly">Friendly</Select.Option>
              <Select.Option value="professional">Professional</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="preferred_language" label="Preferred Language">
            <Select placeholder="Select language">
              <Select.Option value="english">English</Select.Option>
              <Select.Option value="spanish">Spanish</Select.Option>
              <Select.Option value="french">French</Select.Option>
              <Select.Option value="german">German</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="response_length" label="Response Length">
            <Select placeholder="Select response length">
              <Select.Option value="brief">Brief</Select.Option>
              <Select.Option value="moderate">Moderate</Select.Option>
              <Select.Option value="detailed">Detailed</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="response_depth" label="Response Depth">
            <Select placeholder="Select response depth">
              <Select.Option value="basic">Basic</Select.Option>
              <Select.Option value="intermediate">Intermediate</Select.Option>
              <Select.Option value="advanced">Advanced</Select.Option>
            </Select>
          </Form.Item>

          {/* Demographics */}
          <Divider orientation="left">Demographics</Divider>
          <Form.Item name="age_range" label="Age Range">
            <Select placeholder="Select age range">
              <Select.Option value="18-24">18-24</Select.Option>
              <Select.Option value="25-34">25-34</Select.Option>
              <Select.Option value="35-44">35-44</Select.Option>
              <Select.Option value="45+">45+</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="gender_identity" label="Gender Identity">
            <Input placeholder="Enter gender identity" />
          </Form.Item>

          <Form.Item name="location" label="Location">
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item name="income_level" label="Income Level">
            <Select placeholder="Select income level">
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
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
            <Select placeholder="Select company size">
              <Select.Option value="startup">Startup</Select.Option>
              <Select.Option value="small">Small</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="large">Large</Select.Option>
            </Select>
          </Form.Item>

          {/* Purchase Preferences */}
          <Divider orientation="left">Purchase Preferences</Divider>
          <Form.Item name="preferred_products_services" label="Preferred Products/Services">
            <Input placeholder="Enter preferred products/services" />
          </Form.Item>

          <Form.Item name="budget" label="Budget">
            <Select placeholder="Select budget range">
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="purchase_frequency" label="Purchase Frequency">
            <Select placeholder="Select purchase frequency">
              <Select.Option value="rarely">Rarely</Select.Option>
              <Select.Option value="occasionally">Occasionally</Select.Option>
              <Select.Option value="frequently">Frequently</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="loyalty_program_participation" label="Loyalty Program Participation" valuePropName="checked">
            <Switch />
          </Form.Item>

          {/* Expertise & Interests */}
          <Divider orientation="left">Expertise & Interests</Divider>
          <Form.Item name="expertise_topics" label="Expertise Topics (comma-separated)">
            <Input placeholder="Enter expertise topics, separated by commas" />
          </Form.Item>

          <Form.Item name="hobbies_interests" label="Hobbies & Interests (comma-separated)">
            <Input placeholder="Enter hobbies and interests, separated by commas" />
          </Form.Item>

          {/* Chat Behavior */}
          <Divider orientation="left">Chat Behavior</Divider>
          <Form.Item name="response_behavior" label="Response Behavior (comma-separated)">
            <Input placeholder="Enter response behaviors, separated by commas" />
          </Form.Item>

          {/* Advanced Settings */}
          <Divider orientation="left">Advanced Settings</Divider>
          <Form.Item name="knowledge_base" label="Knowledge Base (comma-separated)">
            <Input placeholder="Enter knowledge base topics, separated by commas" />
          </Form.Item>

          <Form.Item name="memory_settings" label="Memory Settings (comma-separated)">
            <Input placeholder="Enter memory settings, separated by commas" />
          </Form.Item>

          <Form.Item name="interaction_style" label="Interaction Style">
            <Select placeholder="Select interaction style">
              <Select.Option value="proactive">Proactive</Select.Option>
              <Select.Option value="reactive">Reactive</Select.Option>
              <Select.Option value="balanced">Balanced</Select.Option>
            </Select>
          </Form.Item>

          {/* Behavioral Attributes */}
          <Divider orientation="left">Behavioral Attributes</Divider>
          <Form.Item name="buying_motivation" label="Buying Motivation (comma-separated)">
            <Input placeholder="Enter buying motivations, separated by commas" />
          </Form.Item>

          <Form.Item name="challenges_pain_points" label="Challenges & Pain Points">
            <TextArea rows={4} placeholder="Enter challenges and pain points" />
          </Form.Item>

          <Form.Item name="preferred_channels" label="Preferred Channels (comma-separated)">
            <Input placeholder="Enter preferred channels, separated by commas" />
          </Form.Item>

          <Form.Item name="decision_making_role" label="Decision Making Role">
            <Select placeholder="Select decision making role">
              <Select.Option value="primary">Primary</Select.Option>
              <Select.Option value="influencer">Influencer</Select.Option>
              <Select.Option value="consultant">Consultant</Select.Option>
            </Select>
          </Form.Item>

          {/* Psychographics */}
          <Divider orientation="left">Psychographics</Divider>
          <Form.Item name="values_beliefs" label="Values & Beliefs">
            <TextArea rows={4} placeholder="Enter values and beliefs" />
          </Form.Item>

          <Form.Item name="lifestyle" label="Lifestyle">
            <TextArea rows={4} placeholder="Enter lifestyle description" />
          </Form.Item>

          {/* Goals */}
          <Divider orientation="left">Goals</Divider>
          <Form.Item name="short_term_goals" label="Short Term Goals">
            <TextArea rows={4} placeholder="Enter short term goals" />
          </Form.Item>

          <Form.Item name="long_term_goals" label="Long Term Goals">
            <TextArea rows={4} placeholder="Enter long term goals" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Create Profile
            </Button>
          </Form.Item>
        </Form>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </div>
    </Modal>
  );
}