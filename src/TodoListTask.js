import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
      this.props.changeTasksStatus(this.props.task, e.currentTarget.checked);
    };

    render = () => {

        const taskClassName = this.props.task.isDone? "todoList-task done" : "todoList-task";

        return (
            <div className={taskClassName}>
                <input onChange={this.onIsDoneChanged}
                       type="checkbox"
                       checked={this.props.task.isDone}/>
                <span>{this.props.task.title}, {this.props.task.priority}</span>
            </div>
        );
    }
}

export default TodoListTask;

