import React, { useState, useEffect } from "react";
import "../App.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addCompleted,
  addTodo,
  deleteTodo,
  setCompletedTodos,
  setTodos,
  updateTodo,
} from "../redux/actions";

const Todo = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos);
  const completedTodos = useSelector((state) => state.completedTodos);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  // Load todos from local storage on component mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      dispatch(setTodos(savedTodos));
    }

    const savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedCompletedTodos) {
      dispatch(setCompletedTodos(savedCompletedTodos));
    }
  }, [dispatch]);

  // Save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);

  const handleAddTodo = () => {
    // Check if both title and description are empty
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Please enter text in both title and description fields.");
      return; // Exit the function early if validation fails
    }

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    dispatch(addTodo(newTodoItem));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const completedTodo = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    // Dispatch action to add the task to the completed section
    dispatch(addCompleted(completedTodo));

    // Remove the task from the todo section
    const updatedTodos = allTodos.filter((_, idx) => idx !== index);
    dispatch(setTodos(updatedTodos));
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteCompletedTodo = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    dispatch(setCompletedTodos(updatedCompletedTodos));
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedTodos)
    );
  };

  useEffect(() => {
    const savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedCompletedTodos) {
      dispatch(setCompletedTodos(savedCompletedTodos));
    }
  }, []);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = () => {
    dispatch(updateTodo(currentEdit, currentEditedItem));
    setCurrentEdit("");
  };

  return (
    <div className="App">
      <h1 className="top">To Do List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter the task title?"
              required="true"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit__wrapper" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Title"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3 className="title">{item.title}</h3>
                      <p className="">{item.description}</p>
                    </div>

                    <div>
                      <button
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      >
                        Delete
                      </button>
                      <button
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      >
                        Complete
                      </button>
                      <button
                        className="check-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <button
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
