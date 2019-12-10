import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
    nextToDoListId = 0;
    state = {
        todoLists: [
            // {id: 1, title: 'What to learn'},
            // {id: 2, title: 'Week tasks'},
            // {id: 3, title: 'Year tasks'}
        ]
    };

    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextToDoListId,
            title: title
        };
        this.nextToDoListId++;
        this.setState({todoLists: [...this.state.todoLists, newTodoList]}, () => {this.saveState()})
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todoList-state', stateAsString)
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todoList-state');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todoLists.forEach((tl) => {
                if (tl.id >= this.nextToDoListId) {
                    this.nextToDoListId = tl.id + 1
                }
            })
        });
    };

    render = () => {

        const todoLists = this.state.todoLists.map(tl => <TodoList id={tl.id} title={tl.title}/>);

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

export default App;

