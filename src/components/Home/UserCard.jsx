import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const UserCard = ({ user }) => {
  return (
    <Card className="mb-4">
      <CardBody className="flex flex-col items-center justify-center p-4">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}+${user.surname}&background=random`}
          alt={`${user.name} ${user.surname}`}
          className="w-20 h-20 rounded-full mb-4"
        />
        <Typography variant="h6" color="blue-gray">
          {user.name} {user.surname}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {user.title}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default UserCard;
