import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    tasks;

    render = () => {
        let tasksElements = this.props.tasks.map(t => <TodoListTask
            task={t}
            changeTasksStatus={this.props.changeTasksStatus}
        />);
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

