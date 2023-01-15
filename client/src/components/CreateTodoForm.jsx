import React, { useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import createTodoRequest from '../api/createTodoRequest';
import { TokenContext } from "../App";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';


export const CreateTodoForm = () => {

    const [text, setText] = useState('');
    const [token] = useContext(TokenContext);

    const queryClient = useQueryClient();

    const {mutate: createTodo} = useMutation(
        (newTodo) => createTodoRequest(newTodo, token),
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos'); // when todos items chane we tell react to refresh all todos item and page
            }
        }
    );

    return (
        <div className='box'>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!text) return;
                createTodo({
                    text,
                });
                setText('');
            }}>
                <input onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder='New Item'/>
                <button>
                    <Fab size="small">
                        <AddIcon />
                    </Fab>
                </button>
            </form>
        </div>
    )
}