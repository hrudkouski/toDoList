import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: true,
        title: ""
    };

    onKeyPress = (e) => {
      if (e.key === 'Enter') {
          return this.onAddTaskClick();
      }
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    onAddTaskClick = () => {
        let newTitle = this.state.title;
        if (newTitle !== "") {
            this.props.addTask(newTitle);
            this.setState({error: false, title: ''});
        } else {
            this.setState({error: true});
        }

    };

    render = () => {

        const inputClassName = this.state.error === true ? "error" : "";

        return (
            <div className="TodoListHeader">
                <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        <input onChange={this.onTitleChanged}
                               value={this.state.title}
                               type="text"
                               placeholder="New task name"
                               className={inputClassName} onKeyPress={this.onKeyPress}/>
                        <button onClick={this.onAddTaskClick}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

