import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import type { RootState } from '../store/store';
import { firestore } from "../../firebaseConfig";
import { collection, addDoc, doc, getDocs, DocumentData } from "@firebase/firestore";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

const initialState: Todo[] = [];

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { dispatch }) => {
    try {
      const todosCollection = collection(firestore, 'todos');
      const querySnapshot = await getDocs(todosCollection);
  
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Todo; // Type cast the data to Todo
        todos.push({ ...data, id: doc.id });
      });
      console.log('Fetched Todos:', todos);
      // Dispatch the setTodos action to update the Redux state
      dispatch(setTodos(todos));
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Handle the error if needed
    }
  });

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add Todo
    add(state, action: PayloadAction<Todo>) {
      return [...state, action.payload];
    },
    // remove Todo
    remove(state, action: PayloadAction<string>) {
      return state.filter((item: Todo) => item.id !== action.payload);
    },
    markComplete(state, action: PayloadAction<string>) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    },
    update(state, action: PayloadAction<{ id: string; todo: string }>) {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, todo: action.payload.todo };
        } else {
          return item;
        }
      });
    },
    setTodos(state, action: PayloadAction<Todo[]>) {
        return action.payload;
      },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled action of fetchTodos
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { add, remove, markComplete, update,setTodos } = todoSlice.actions;
export default todoSlice.reducer;
