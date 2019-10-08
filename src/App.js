import React from 'react';
import './App.css';
// import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

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
    onAddTaskClick = () => {
        let newTask = {
            title: this.newTaskTitleRef.current.value,
            priority: "low",
            isDone: false
        };
        this.newTaskTitleRef.current.value = '';
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        })
    };
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    {/*<TodoListHeader/>*/}
                    <div className="TodoListHeader">
                        <div className="todoList-header">
                            <h3 className="todoList-header__title">What to Learn</h3>
                            <div className="todoList-newTaskForm">
                                <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                                <button onClick={this.onAddTaskClick}>Add</button>
                            </div>
                        </div>
                    </div>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

