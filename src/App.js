import React, { Component } from "react";

import Dragula from "react-dragula";

import "./App.css";

import plus from "./images/plus.svg";

import AddTodo from "./todo/AddTodo";
import ExistingTodo from "./todo/ExistingTodo";

import { BASE_PATH } from "./utils/config";

class App extends Component {
  state = {
    error: undefined,
    items: undefined
  };

  setErrorMessage = error => {
    this.setState(state => ({
      ...state,
      error
    }));
  };

  componentDidMount() {
    fetch(`${BASE_PATH}`)
      .then(response => response.json())
      .then(todos => {
        this.setState(state => ({
          ...state,
          items: todos
        }));
      })
      .catch(this.setErrorMessage);
  }

  onAddSuccess = (_id, text) => {
    this.setState(state => ({
      ...state,
      items: [...state.items, { _id, done: false, text }]
    }));
  };

  onUpdateTodoSuccess = (_id, done, text) => {
    this.setState(state => ({
      ...state,
      items: state.items.reduce(
        (acc, curr) => [
          ...acc,
          curr._id === _id
            ? {
                _id,
                done,
                text
              }
            : curr
        ],
        []
      )
    }));
  };

  onDeleteTodoSuccess = id => {
    this.setState(state => ({
      ...state,
      items: state.items.filter(({ _id }) => id !== _id)
    }));
  };

  dragulaDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {
        moves: (a, b, c, d) => {
          return true;
        }
      };
      const drake = Dragula([componentBackingInstance], options);
      drake.on("drop", el => {
        const { items } = this.state;
        const sourceId = el.id.split("_")[1];
        const sourceIndex = items.findIndex(({ _id }) => _id === sourceId);
        const targetIndex = Array.from(el.parentNode.childNodes).indexOf(el);
        this.onDragReorder(sourceIndex, targetIndex);
      });
    }
  };

  onDragReorder = (sourceIndex, targetIndex) => {
    const { items } = this.state;

    [targetIndex, sourceIndex] = [sourceIndex, targetIndex].sort();
    fetch(`${BASE_PATH}/reorder/${items[sourceIndex]._id}/${targetIndex}`, {
      method: "PUT"
    })
      .then(() => {
        this.setState(state => ({
          ...state,
          items: [
            ...items.slice(0, targetIndex),
            items[sourceIndex],
            ...items.slice(targetIndex, sourceIndex),
            ...items.slice(sourceIndex + 1)
          ]
        }));
      })
      .catch(this.setErrorMessage);
  };

  renderLoadingOrError = error =>
    <div className="App-loading-error">
      <span>
        {error ? `An erorr occured: ${error.message}` : "Loading please wait."}
      </span>
    </div>;

  renderTodoItems = items =>
    <div className="App-todo-items" ref={this.dragulaDecorator}>
      {items.map(({ _id, done, text }) =>
        <ExistingTodo
          key={_id}
          _id={_id}
          done={done}
          text={text}
          onDeleteSuccess={this.onDeleteTodoSuccess}
          onUpdateSuccess={this.onUpdateTodoSuccess}
        />
      )}
    </div>;

  render() {
    const { error, items } = this.state;
    return (
      <div className="App">
        <div className="Content">
          <div className="App-header">
            <span className="App-header-title">Task Manager</span>
            <img src={plus} className="Plus-icon" />
          </div>
          <AddTodo onAddSuccess={this.onAddSuccess} />
          {items
            ? this.renderTodoItems(items)
            : this.renderLoadingOrError(error)}
        </div>
      </div>
    );
  }
}

export default App;
