import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import plus from "./images/plus.svg";

import AddTodo from "./addtodo/AddTodo";
import TodoItem from "./todo/TodoItem";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Content">
          <div className="App-header">
            <span className="App-header-title">Task Manager</span>
            <img src={plus} className="Plus-icon" />
          </div>
          <AddTodo />
          <TodoItem done={true} text="Integrate redux" />
          <TodoItem done={false} text="Complete app" />
        </div>
      </div>
    );
  }
}

export default App;
