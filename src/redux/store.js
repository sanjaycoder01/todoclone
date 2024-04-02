import { createStore } from "redux";
import rootReducer from "./reducers";

// Load initial state from local storage
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  completedTodos: JSON.parse(localStorage.getItem("completedTodos")) || [],
};

const store = createStore(rootReducer, initialState);

export default store;
