import "./styles.css";
import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import {TodoList} from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(()=> {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue === null) return [];
    return JSON.parse(localValue);
  });
  useEffect(()=> {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos])

  function addToDo(title){
      setTodos( currentTodos => { 
      return [
        ...currentTodos, 
        { 
          id: crypto.randomUUID(), 
          title,
          completed: false 
        },
        ]
      })
  }


   function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id) {
          return { ...todo, completed};
        }
        return todo; 
      })
    })
   }

   function deleteTodo(id) {
    console.log(id);
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    })
   }

  return (
    <>
     <NewTodoForm onSubmit={addToDo} />
      <h1 className="header">To Do</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      {/* <ul className="list">
        {todos.length === 0 && "No Todos"}
       {todos.map(todo => {
        return <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
          </label>
          <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
        </li>
       })} 
      </ul> */}
    </>
  )
}