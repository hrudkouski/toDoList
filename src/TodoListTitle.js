import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {


    render = () => {

        return ( <div>
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <button onClick={this.props.deleteTodoList}>X</button>
            </div>
        );
    }
}

export default TodoListTitle;

