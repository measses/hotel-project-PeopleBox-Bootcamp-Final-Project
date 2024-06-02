import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="flex flex-col items-center justify-center">
        <Typography variant="small" color="white" className="font-normal">
          © 2024 Otel Yönetim Sistemi
        </Typography>
        <Typography variant="small" color="white" className="font-normal mt-1">
          Mert Araz Tarafından yapıldı{" "}
          <FaHeart className="inline text-red-500" /> Otel Yönetim Ekibi
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
