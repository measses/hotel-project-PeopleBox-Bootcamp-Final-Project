import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Card, Typography, message, Modal } from "antd";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const showModal = (title, content) => {
    Modal.error({
      title: title,
      content: content,
    });
  };

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      if (result.success) {
        message.success("Login successful");
        navigate("/");
      } else {
        showModal("Login Error", result.message);
      }
    } catch (err) {
      showModal("Login Error", err.message);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "50px" }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center" }}>
          Giriş Yap
        </Title>
        <Form form={form} onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
