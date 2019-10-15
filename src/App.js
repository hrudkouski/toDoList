import React from 'react';
import './App.css';
// import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
        // setTimeout(() => {
        //         let newTask = {
        //             title: "Angular",
        //             isDone: false,
        //             priority: "low"
        //         };
        //         // делаем копию массива и помещаем в конец новую таску
        //         let newTasks = [...this.state.tasks, newTask];
        //         // меняем стейт с помощью специального метода this.setState
        //         // передавая в качестве аргумента новый с теми свойствами которые
        //         // нужно поменять: обратите внимание, filterValue останется прежним
        //         this.setState({
        //             tasks: newTasks
        //         });
        //     }, 3000
        // );
    }

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "high"},
            {title: "HTML", isDone: false, priority: "low"},
            {title: "CSS", isDone: false, priority: "medium"},
            {title: "React", isDone: true, priority: "high"}
        ],
        filterValue: "Active"
    };
    addTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            priority: "high",
            isDone: false
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        })
    };

    onFilterChanged = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTasksStatus = (task, isDone) => {
    let newTasks = this.state.tasks.map(t => {
        if (t !==task) {
            return t;
        }
        else {
            return {...t, isDone: isDone};
        }
        });
    this.setState({
        tasks: newTasks
    })
    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks changeTasksStatus={this.changeTasksStatus} tasks={this.state.tasks.filter(t => {
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

