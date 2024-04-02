import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  ADD_COMPLETED,
  SET_COMPLETED_TODOS,
  SET_TODOS, // Import SET_TODOS action type
} from "./actions";

const initialState = {
  todos: [],
  completedTodos: [], // New state slice to manage completed todos
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload),
      };
    case UPDATE_TODO:
      const { index, updatedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo, idx) =>
          idx === index ? updatedTodo : todo
        ),
      };
    case ADD_COMPLETED:
      return {
        ...state,
        completedTodos: [...state.completedTodos, action.payload],
      };
    case SET_COMPLETED_TODOS:
      return {
        ...state,
        completedTodos: action.payload,
      };
    case SET_TODOS: // Handle SET_TODOS action
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
