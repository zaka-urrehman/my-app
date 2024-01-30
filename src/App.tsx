import React, { useEffect } from 'react';
import './scss/App.scss';
import  Todos  from './components/todos';
import { fetchTodos } from './redux/slices/todoSlice';
import { useAppDispatch } from './utils/hooks';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Dispatch the fetchTodos async action when the component mounts
    dispatch(fetchTodos());
  }, []);

  return (
    <main>

      <h1 className='main-heading'>Todo App</h1>     
      <Todos/>
    </main>
  );
}

export default App;
