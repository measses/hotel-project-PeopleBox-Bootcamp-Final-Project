import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Card, Typography, message } from "antd";
import axios from "axios";

const { Title } = Typography;

const VerifyEmail = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleVerify = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/auth/verify.php",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success("Email successfully verified!");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Verification failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "50px" }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center" }}>
          Verify Email
        </Title>
        <Form form={form} onFinish={handleVerify} layout="vertical">
          <Form.Item
            label="Verification Code"
            name="code"
            rules={[
              { required: true, message: "Please enter the verification code" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Verify
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default VerifyEmail;
