import React from "react";
import TodoItem from "./TodoItem";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaClipboardList } from "react-icons/fa";

const todos = [
  { task: "Oda temizliği kontrolü", dueDate: "Bugün" },
  { task: "Yeni rezervasyonları onayla", dueDate: "Yarın" },
  { task: "Müşteri geri bildirimlerini değerlendir", dueDate: "Bu Hafta" },
];

const TodoList = () => {
  return (
    <Card className="mb-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex items-center gap-4"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <FaClipboardList className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            To-Do List
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-4 mt-5">
        {todos.map((item, index) => (
          <TodoItem key={index} item={item} />
        ))}
      </CardBody>
    </Card>
  );
};

export default TodoList;
