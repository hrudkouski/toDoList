import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e) => {
      this.props.changeTasksStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    render = () => {

        const taskClassName = this.props.task.isDone? "todoList-task done" : "todoList-task";

        return (
            <div className={taskClassName}>
                <input onChange={this.onIsDoneChanged}
                       type="checkbox"
                       checked={this.props.task.isDone}/>
                {this.state.editMode
                ? <input onBlur={this.deActivateEditMode}
                         onChange={this.onTitleChanged}
                         autoFocus={true}
                         value={this.props.task.title}/>
                : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>}, priority: {this.props.task.priority}
            </div>
        );
    }
}

export default TodoListTask;

