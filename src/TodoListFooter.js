import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {
    render = () => {

        let classForAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
        let classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';

        return (
            <div className="TodoListFooter">
                    <div className="todoList-footer">
                        <button className={classForAll}>All</button>
                        <button className={classForCompleted}>Completed</button>
                        <button className={classForActive}>Active</button>
                    </div>
            </div>
        );
    }
}

export default TodoListFooter;
