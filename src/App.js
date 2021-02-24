import './App.css';
import React, { useState, useEffect } from 'react'
import { ToDoItem } from './ToDoItem'
import { initialTasks } from './initialTasks'
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [warning, setWarning] = useState('');

  const [Input, setInput] = useState('');

  const [inputTime, setInputTime] = useState('');
 
  const [todos, setTodo] = useState([]);

  const addTodo = (e) => {
    if(Input === '' || inputTime===''){
      setWarning('Please enter both due time and task name!!!');
    }
    else{
      db.collection('todos').add({
        taskName:Input,
        taskComplete:inputTime,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setWarning('');
      setInput('');
      setInputTime('');
    }
  }

  const date = new Date();

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodo(snapshot.docs.map(doc => doc.data()))
    })    
  },[])

  return (
    <div className="App">
      <div className="todo_header">
        <div className="todos_for_the_day" style={{ fontWeight:600, fontSize:20, marginBottom:'5%' }}>To Do's For {date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()} </div>
        <div className="todo_input" style={{ marginBottom:'3%' }}>
          <input className="input_todo" 
                placeholder="Task Description" 
                type="text" 
                required 
                maxLength="20" 
                value={Input} 
                onChange={ e => setInput(e.target.value) } 
          />
          <input className="input_time_todo" 
                type="time" 
                required 
                value={inputTime} 
                onChange={ e => {
                    setInputTime(e.target.value)
                    console.log(e.target.value)
                    }
                } 
          />
          <button className="add_todo" id="add_todo" onClick={addTodo} >Add ToDo</button>
        </div>
      </div>
      <div className="todos">
        {todos.map( ( todo )=> (
          <div>
            <ToDoItem 
              key={todos.indexOf(todo)}
              todoItem={todo.taskName.slice(0,18)}
              deadline={todo.taskComplete}
            />
            <div className="hrline" style={{width:'116%', height:'0.2px', backgroundColor:'rgb(173,173,173)', marginTop:'1%', marginBottom:'1%', marginLeft:'-8%' }} ></div>
          </div>
        ))}
      </div>
      <p id="warning">{warning}</p>
    </div>
  );
}

export default App;
