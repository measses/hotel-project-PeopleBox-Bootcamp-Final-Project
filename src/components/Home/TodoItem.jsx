import React from "react";
import { Typography } from "@material-tailwind/react";

const TodoItem = ({ item }) => {
  return (
    <div className="p-2 flex items-center justify-between border-b border-gray-200">
      <Typography variant="small" color="blue-gray">
        {item.title}
      </Typography>
      <Typography variant="small" color="gray">
        {item.dueDate}
      </Typography>
    </div>
  );
};

export default TodoItem;
