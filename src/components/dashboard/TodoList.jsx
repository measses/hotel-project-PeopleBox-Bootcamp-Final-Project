import React from "react";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </form>
      <div className="h-64 overflow-y-auto px-4 custom-scrollbar">
        <ul className="divide-y divide-gray-200">
          {todos.map((todo, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center">
                <input
                  id={`todo${index}`}
                  name={`todo${index}`}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`todo${index}`}
                  className="ml-3 block text-gray-900 flex-1 break-words"
                >
                  <span
                    className={`text-lg font-medium ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(index)}
                  className="ml-auto bg-red-500 text-white p-1 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaTrash size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
