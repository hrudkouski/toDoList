import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    tasks;

    render = () => {
        let tasksElements = this.props.tasks.map(t => <TodoListTask
            task={t}
            deleteTask={this.props.deleteTask}
            changeTasksStatus={this.props.changeTasksStatus}
            changeTitle={this.props.changeTitle}
        />);
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

