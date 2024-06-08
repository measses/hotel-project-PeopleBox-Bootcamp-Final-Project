import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "../../redux/slices/todoSlice";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { FaClipboardList } from "react-icons/fa";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // İlk 5 görevi listele
  const displayedTodos = todos.slice(0, 5);

  const handleConfirm = (todo) => {
    dispatch(updateTodo({ ...todo, isConfirmed: todo.isConfirmed ? 0 : 1 }));
  };

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
        {loading && <Typography>Yükleniyor...</Typography>}
        {error && <Typography color="red">{error}</Typography>}
        {displayedTodos.map((item) => (
          <div
            key={item.id}
            className={`p-4 flex flex-col border-b border-gray-200 ${
              item.isConfirmed ? "line-through" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <Typography variant="small" color="blue-gray">
                {item.title}
              </Typography>
              <Typography variant="small" color="gray">
                {item.dueDate}
              </Typography>
              <Checkbox
                checked={item.isConfirmed}
                onChange={() => handleConfirm(item)}
                className="ml-2"
              />
            </div>
            <Typography variant="body2" color="blue-gray" className="mt-2">
              {item.description}
            </Typography>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default TodoList;
