import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Modal,
  Checkbox,
} from "antd";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/measses_logo.png"; // Ensure the path to your logo is correct

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
        message.success("Giriş Başarılı!");
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
      className="login-container"
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "56.2%",
          backgroundImage: `url("https://images.unsplash.com/photo-1554647286-f365d7defc2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px 0 0 10px",
        }}
      />
      <Card
        style={{
          width: "400px",
          borderRadius: "0 10px 10px 0",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", borderRadius: "10px" }}
          />
        </div>
        <Title level={2} style={{ textAlign: "center" }}>
          Giriş Yap
        </Title>
        <Form form={form} onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı girin" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi girin" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Checkbox>Beni hatırla</Checkbox>
            <Link to="/forgot-password" style={{ float: "right" }}>
              Şifremi unuttum
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          Hesabın yok mu? <Link to="/register">Kaydol</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
