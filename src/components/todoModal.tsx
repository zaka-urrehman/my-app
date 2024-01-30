import React, { useState } from 'react'
import { useAppDispatch } from '../utils/hooks'
import { update } from '../redux/slices/todoSlice'
import { collection, doc, updateDoc } from '@firebase/firestore'
import { firestore } from '../firebaseConfig';


interface Props {
    todoItem: {
        id: string
        todo: string
        completed: boolean
    };
    handleModel(): void;
}


const TodoModal = ({ todoItem: { id, completed, todo }, handleModel }: Props) => {
    const [text, setText] = useState(todo)
    const dispatch = useAppDispatch()

    const updateTodo = async (todo: Todo) => {
        const todosCollection = collection(firestore, 'todos');
        const todoDocRef = doc(todosCollection, id.toString()); // Convert id to string if it's a number
        await updateDoc(todoDocRef, { 'todo': todo.todo, 'completed': completed });

        dispatch(update(todo))
        handleModel()
    }
    return (
        <div className='modal-wrapper'>
            <div className='todo-modal'>
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => updateTodo({
                    id,
                    todo: text,
                    completed
                })}>Update</button>
            </div>
        </div>
    )
}

export default TodoModal