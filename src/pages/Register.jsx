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
          "Kayıt başarılı. Lütfen hesabınızı doğrulamak için e-posta adresinizi kontrol edin."
        );
        setEmail(values.email);
        setIsVerifyModalVisible(true);
      } else {
        showModal("Kayıt Hatası", result.message);
      }
    } catch (err) {
      showModal("Kayıt Hatası", err.message);
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
        message.success("E-posta başarıyla doğrulandı!");
        setIsVerifyModalVisible(false);
        navigate("/login");
      } else {
        showModal("Doğrulama Hatası", response.data.message);
      }
    } catch (err) {
      showModal("Doğrulama Hatası", err.message);
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
            label="Kullanıcı Adı"
            name="username"
            rules={[
              { required: true, message: "Lütfen kullanıcı adını giriniz" },
              { min: 3, message: "Kullanıcı adı en az 3 karakter olmalıdır" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Lütfen email giriniz" },
              { type: "email", message: "Lütfen geçerli bir email giriniz" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name="password"
            rules={[
              { required: true, message: "Lütfen şifrenizi giriniz" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message:
                  "Şifre en az 8 karakter olmalı ve en az bir büyük harf ve bir küçük harf içermelidir",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Şifreyi Onayla"
            name="confirm_password"
            rules={[
              { required: true, message: "Lütfen şifrenizi onaylayın" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("İki şifre birbiriyle uyuşmuyor")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          Zaten hesabınız var mı? <Link to="/login">Giriş Yapın</Link>
        </div>
      </Card>

      <Modal
        title="E-posta Doğrulama"
        visible={isVerifyModalVisible}
        onCancel={() => setIsVerifyModalVisible(false)}
        footer={null}
      >
        <Form form={verifyForm} onFinish={handleVerify} layout="vertical">
          <Form.Item
            label="Doğrulama Kodu"
            name="code"
            rules={[
              { required: true, message: "Lütfen doğrulama kodunu giriniz" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Doğrula
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
