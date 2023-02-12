import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useQueryClient, useMutation, QueryClient } from 'react-query';
import deleteTodoRequest from '../api/deleteTodoRequest';
import updateTodoRequest from '../api/updateTodoRequest';
import { debounce } from 'lodash';
import { TokenContext } from "../App";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const TodoItem = ({todo}) => {
    const [text, setText] = useState(todo.text);
    const [token] = useContext(TokenContext);

    const queryClient = useQueryClient();

    const {mutate: updateTodo} = useMutation(
        (updatedTodo) => { return updateTodoRequest(updatedTodo, token)},
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos'); // when todos items chane we tell react to refresh all todos item and page
            }
        }
    );

    const {mutate: deleteTodo} = useMutation(
        (updatedTodo) => { return deleteTodoRequest(updatedTodo, token)},
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos'); // when todos items chane we tell react to refresh all todos item and page
            }
        }
    );

    const debouncedUpdateTodo = useCallback(debounce(updateTodo, 600), [updateTodo]);

    useEffect(() => {
        if (text !== todo.text) {
            debouncedUpdateTodo({
                ...todo,
                text
            });
        }
    }, [text]); // will call a callback function every time someone types into input box

    return (
        <div className="input-items">
                <input checked={todo.completed} type="checkbox" onChange={() => updateTodo({
                    ...todo, 
                    completed: !todo.completed
                })} />
                <input type="text" value={text}  onChange={(e) => setText(e.target.value)} />
                <IconButton aria-label="delete" size="small" onClick={() => deleteTodo(todo)}><DeleteIcon fontSize="inherit" />
                </IconButton>
        </div>
    );
}

export default TodoItem;