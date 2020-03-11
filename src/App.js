import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC} from "./reducer";

class App extends React.Component {
    nextToDoListId = 0;
    state = {
        todoLists: []
    };

    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextToDoListId,
            title: title,
            tasks: []
        };
        this.props.addTodolist(newTodoList);
        this.nextToDoListId++;

    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todoLists', stateAsString)
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todoLists');
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

        const todoLists = this.props.todoLists.map(tl => <TodoList
            id={tl.id}
            title={tl.title}
            tasks={tl.tasks}/>);

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

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = addTodolistAC(newTodolist);
            dispatch(action);
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;

