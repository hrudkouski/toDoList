import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {
    addTaskAC,
    deleteTaskAC,
    deleteTodoListAC,
    updateTaskAC
} from "./reducer";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    state = {
        tasks: [],
        filterValue: "Active"
    };

    nextTaskId = 0;

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach((task) => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            })
        });
    };

    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            priority: "high",
            isDone: false
        };
        this.nextTaskId++;
        this.props.addTask(newTask, this.props.id);

    };

    changeTask = (taskId, obj) => {
        this.props.changeTask(taskId, obj, this.props.id);
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId);
    };

    onFilterChanged = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    };

    changeTasksStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList-header'>
                        <TodoListTitle
                            deleteTodoList={this.deleteTodoList}
                            title={this.props.title}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks deleteTask={this.deleteTask}
                                   changeTitle={this.changeTitle}
                                   changeTasksStatus={this.changeTasksStatus}
                                   tasks={this.props.tasks.filter(t => {
                                       if (this.state.filterValue === 'All') {
                                           return true;
                                       }
                                       if (this.state.filterValue === 'Completed') {
                                           return t.isDone;
                                       }
                                       if (this.state.filterValue === 'Active') {
                                           return !t.isDone;
                                       }
                                   })}/>
                    <TodoListFooter onFilterChanged={this.onFilterChanged}
                                    filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = addTaskAC(newTask, todolistId);
            dispatch(action);
        },
        changeTask: (taskId, obj, todolistId) => {
            const action = updateTaskAC(taskId, obj, todolistId);
            dispatch(action);
        },
        deleteTodoList: (todolistId) => {
            const action = deleteTodoListAC(todolistId);
            dispatch(action);
        },
        deleteTask: (todolistId, taskId) => {
            const action = deleteTaskAC(todolistId, taskId);
            dispatch(action);
        }
    }
};

const ConnectedToDoList = connect(null, mapDispatchToProps)(TodoList);


export default ConnectedToDoList;

