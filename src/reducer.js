export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'TodoList/Reducer/ADD-TASK';
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/Reducer/DELETE-TASK';

const initialState = {
    todoLists: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [
                    ...state.todoLists,
                    action.newTodolist
                ]
            };
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                        if (tl.id === action.todolistId) {
                            return {
                                ...tl,
                                tasks: [...tl.tasks, action.newTask]
                            }
                        } else {
                            return tl;
                        }
                    }
                )
            };
        case CHANGE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {
                                        ...task,
                                        ...action.obj
                                    }
                                } else {
                                    return task;
                                }
                            })
                        }
                    } else {
                        return tl;
                    }
                })
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(tl => tl.id !== action.todolistId)
            };
        case DELETE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t =>
                                t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    return state;
};

export const updateTaskAC = (taskId, obj, todolistId) => {
    return {
        type: CHANGE_TASK,
        taskId, obj, todolistId
    }
};

export const addTaskAC = (newTask, todolistId) => {
    return {
        type: ADD_TASK,
        newTask, todolistId
    }
};

export const deleteTodoListAC = (todolistId) => {
    return {
        type: DELETE_TODOLIST,
        todolistId
    }
};

export const deleteTaskAC = (todolistId, taskId) => {
    return {
        type: DELETE_TASK,
        todolistId,
        taskId
    }
};

export const addTodolistAC = (newTodolist) => {
    return {
        type: ADD_TODOLIST,
        newTodolist
    }
};


export default reducer;

