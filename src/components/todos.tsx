import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { add, fetchTodos } from '../redux/slices/todoSlice'
import TodoItem from './todoItem'
// import { db } from '../firebaseConfig'
import { addDoc,collection } from '@firebase/firestore'
import { firestore } from '../firebaseConfig'

const Todos = () => {
    const [todo, setTodo] = useState("")
    const dispatch = useAppDispatch()
    const todos = useAppSelector((state: any) => state.todoReducer)
    const isInputEmpty = todo.trim() === '';    

    const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTodo(e.target.value)
    }

    const addTodo = async(todo:any) => {   
        const todosCollection = collection(firestore, 'todos');
        const docRef = await addDoc(todosCollection, todo);
        
        
        dispatch(add({ ...todo, id: docRef.id }))      
        setTodo("")
    }

    
    return (
        <section>
            {/* Todo Input */}
            <div className='todo-input'>
                <input type="text" value={todo} onChange={(e) => handleTodo(e)} />
                <button
                disabled={isInputEmpty}
                onClick={() => addTodo({
                    todo: todo,
                    completed: false
                })}>+</button>
            </div>

            {/* List of Todos */}
            <div className='todolist-container'>
                {todos.map((item: Todo, index: number) => (
                    <div key={index}>                        
                        <TodoItem todo={item.todo} completed={item.completed} id={item.id} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Todos
