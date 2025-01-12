import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [toDos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const saveTodo = () => {
    if (!input.trim()) {
      alert("Please enter a valid todo");
      return;
    }

    
    if (editingId) {
      axios
        .put(`${baseURL}/update/${editingId}`, { toDo: input })
        .then((res) => {
          const updatedTodos = toDos.map((todo) =>
            todo._id === editingId ? { ...todo, toDo: input } : todo
          );
          setTodos(updatedTodos);
          setEditingId(null);
          setInput("");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${baseURL}/save`, { toDo: input })
        .then((res) => {
          setTodos([...toDos, res.data]);
          setInput("");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setInput(text);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then(() => {
        setTodos(toDos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="bg-blue-950 min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Todo App</h1>
        <div className="flex gap-2 mb-6">
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
            label={editingId ? "Edit Todo" : "Add a Todo"}
          />
          <button
            onClick={saveTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
        <div id="list" className="space-y-4">
          {toDos.map((todo) => (
            <ToDo
              key={todo._id}
              todo={todo}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
