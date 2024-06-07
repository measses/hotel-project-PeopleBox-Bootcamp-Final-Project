import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const UserCard = ({ user }) => {
  const avatarUrl = user.profile_picture
    ? `http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/uploads/${user.profile_picture}`
    : `https://ui-avatars.com/api/?name=${user.username}&background=random`;

  return (
    <Card className="mb-4">
      <CardBody className="flex flex-col items-center justify-center p-4">
        <img
          src={avatarUrl}
          alt={`${user.username}`}
          className="w-20 h-20 rounded-full mb-4"
        />
        <Typography variant="h6" color="blue-gray">
          {user.username}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {user.email}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {user.user_type === "admin" ? "Admin" : "User"}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default UserCard;
