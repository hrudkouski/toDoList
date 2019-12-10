import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ''
    };

    onKeyPress = (e) => {
      if (e.key === 'Enter') {
          return this.onAddItemClick();
      }
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    onAddItemClick = () => {
        let newTitle = this.state.title;
        if (newTitle !== "") {
            this.props.addItem(newTitle);
            this.setState({error: false, title: ''});
        } else {
            this.setState({error: true});
        }
    };

    render = () => {

        const inputClassName = this.state.error ? "error" : "";

        return (
                    <div className="todoList-newTaskForm">
                        <input onChange={this.onTitleChanged}
                               value={this.state.title}
                               className={inputClassName}
                               type="text"
                               placeholder="New item name"
                               onKeyPress={this.onKeyPress}/>
                        <button onClick={this.onAddItemClick}>Add</button>
                    </div>
        );
    }
}

export default AddNewItemForm;

