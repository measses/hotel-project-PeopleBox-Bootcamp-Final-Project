import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Errorpage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Üzgünüz, aradığınız sayfa mevcut değil."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Anasayfaya Dön
        </Button>
      }
    />
  );
};

export default Errorpage;
