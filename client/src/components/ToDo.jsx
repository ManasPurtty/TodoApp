import React from "react";
import { RiEditFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const ToDo = ({ todo, handleEdit, handleDelete }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow border-slate-950">
      <span className="text-gray-800">{todo.toDo}</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(todo._id, todo.toDo)}
          className="text-blue-500 hover:text-blue-700"
        >
          <RiEditFill size={20} />
        </button>
        <button
          onClick={() => handleDelete(todo._id)}
          className="text-red-500 hover:text-red-700"
        >
          <RxCross1 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ToDo;
