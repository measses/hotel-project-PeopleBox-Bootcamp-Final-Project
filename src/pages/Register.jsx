import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Card, Typography, message, Modal } from "antd";
import { register } from "../redux/slices/authSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [verifyForm] = Form.useForm();
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const showModal = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const handleRegister = async (values) => {
    try {
      const result = await dispatch(register(values)).unwrap();
      if (result.success) {
        message.success(
          "Registration successful. Please check your email to verify your account."
        );
        setEmail(values.email);
        setIsVerifyModalVisible(true);
      } else {
        showModal("Registration Error", result.message);
      }
    } catch (err) {
      showModal("Registration Error", err.message);
    }
  };

  const handleVerify = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/auth/verify.php",
        { code: values.code, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success("Email successfully verified!");
        setIsVerifyModalVisible(false);
        navigate("/login");
      } else {
        showModal("Verification Error", response.data.message);
      }
    } catch (err) {
      showModal("Verification Error", err.message);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "50px" }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center" }}>
          Kayıt Ol
        </Title>
        <Form form={form} onFinish={handleRegister} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card>

      <Modal
        title="Verify Email"
        visible={isVerifyModalVisible}
        onCancel={() => setIsVerifyModalVisible(false)}
        footer={null}
      >
        <Form form={verifyForm} onFinish={handleVerify} layout="vertical">
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
      </Modal>
    </div>
  );
};

export default Register;
