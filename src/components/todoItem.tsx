import { useState } from "react"
import { markComplete, remove } from "../redux/slices/todoSlice"
import { useAppDispatch } from "../utils/hooks"
import { CiEdit } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import TodoModal from "./todoModal"
import { firestore } from "../firebaseConfig";
import { collection,updateDoc,doc,deleteDoc } from "@firebase/firestore";

const TodoItem = ({ todo, completed, id }: Todo) => {
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false)

    const deleteTodo = async(id: string) => {
        const todosCollection = collection(firestore, 'todos');
        const todoDoc = doc(todosCollection, id);
        await deleteDoc(todoDoc);

        dispatch(remove(id))
    }

    const markCompleted = async(id: string) => {       
        const todosCollection = collection(firestore, 'todos');
        const todoDoc = doc(todosCollection, id);
        await updateDoc(todoDoc, { completed: !completed });
        dispatch(markComplete(id))
    }

    const handleModel = () => {
        setShowModal(!showModal)
    }

    return (
        <div className="card">
            <p className={`${completed?"completed":""}`}>
                {todo}
            {/* {completed && <p className="completed">completed</p>} */}
            </p>
            <div className="btn-container">
                <button onClick={() => markCompleted(id)}><IoMdDoneAll size={25}/></button>
                <button onClick={() => handleModel()}><CiEdit size={25}/></button>
                <button onClick={() => deleteTodo(id)}><MdOutlineDeleteForever size={25}/></button>
            </div>
            {
                showModal && <TodoModal todoItem={{ id, completed, todo }} handleModel={handleModel} />
            }

        </div>
    )
}

export default TodoItem