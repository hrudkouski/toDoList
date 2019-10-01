import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    tasks = [
        {title: "JS", isDone: true, priority: "high"},
        {title: "HTML", isDone: false, priority: "low"},
        {title: "CSS", isDone: false, priority: "medium"},
        {title: "React", isDone: true, priority: "high"}
    ];
    filterValue='All';

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

