import React from "react";
import UserCard from "./UserCard";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/outline";

const users = [
  { name: "John", surname: "Doe", title: "Manager" },
  { name: "Jane", surname: "Smith", title: "Receptionist" },
  { name: "Emily", surname: "Johnson", title: "Housekeeper" },
];

const Users = () => {
  return (
    <Card className="mb-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex items-center gap-4"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <UsersIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Kullanıcılar
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </CardBody>
    </Card>
  );
};

export default Users;
