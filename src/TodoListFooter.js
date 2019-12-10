import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {

    state = {
        isHidden: true
    };

    onAllFilterClick = () => {
        this.props.onFilterChanged('All')
    };
    onCompletedFilterClick = () => {
        this.props.onFilterChanged('Completed')
    };
    onActiveFilterClick = () => {
        this.props.onFilterChanged('Active')
    };
    onShowFiltersClick = () => {
        this.setState({isHidden: true})
    };
    onHideFiltersClick = () => {
        this.setState({isHidden: false})
    };


    render = () => {

        let classForAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
        let classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';

        return (
            <div className="TodoListFooter">
                <div className="todoList-footer">
                    {!this.state.isHidden && <div className="buttonFooter">
                        <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                        <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                        <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                    </div>}
                    <div className={'hideShow'}>
                        {!this.state.isHidden && <span onClick={this.onShowFiltersClick}>hide</span>}
                        {this.state.isHidden && <span onClick={this.onHideFiltersClick}>show</span>}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListFooter;

