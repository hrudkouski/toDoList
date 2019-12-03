import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    state = {
        tasks: [
            // {id: 0, title: "JS", isDone: true, priority: "high"},
            // {id: 1,title: "HTML", isDone: false, priority: "low"},
            // {id: 2,title: "CSS", isDone: false, priority: "medium"},
            // {id: 3,title: "React", isDone: true, priority: "high"}
        ],
        filterValue: "Active"
    };

    nextTaskId = 0;

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString)
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
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
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
        this.saveState( {
            tasks: newTasks
        }, () => { this.saveState(); });
    };

    onFilterChanged = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj};
            }
        });
        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); });
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
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks changeTitle={this.changeTitle} changeTasksStatus={this.changeTasksStatus} tasks={this.state.tasks.filter(t => {
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

export default App;

