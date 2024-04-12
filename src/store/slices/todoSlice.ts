import {createSlice} from '@reduxjs/toolkit';
import {TodoType} from "@/types";

const todoInitial: TodoType = {
    id: '',
    title: '',
    status: '',
    time: ''
}
const getInitialTodo = () => {
    // getting todo list
    const localTodoList = window.localStorage.getItem('TODO_LIST');

    // if todo list is not empty
    if(localTodoList) {
        return JSON.parse(localTodoList)
    }
    window.localStorage.setItem('TODO_LIST', '');
    return [todoInitial];
};

const initialValue = {
    filterStatus: 'all',
    todoList: getInitialTodo()
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload
        }
    }
});

export const {updateFilterStatus} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;