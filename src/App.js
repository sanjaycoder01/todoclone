import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import Todo from "./components/Todo";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
