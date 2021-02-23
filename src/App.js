import './App.css';
import React, { useState } from 'react'
import { ToDoItem } from './components/ToDoItem'
import { initialTasks } from './initialTasks'

function App() {

  const [task, setTask] = useState(4);

  const [warning, setWarning] = useState('');

  const [Input, setInput] = useState('');

  const [inputTime, setInputTime] = useState('');
 
  const [todos, setTodo] = useState(initialTasks);

  const setJson = () =>{
    return {
      taskNo:task,
      taskName:Input,
      taskComplete:inputTime
    }
  }
  
  const addTodo = (e) => {
    setTask(task+1);
    if(Input === '' || inputTime===''){
      setWarning('Please enter both due time and task name!!!');
    }
    else{
      setWarning('');
      setTodo([...todos, setJson()]);
      setInput('');
      setInputTime('');
    }
  }

  const date = new Date();

  return (
    <div className="App">
      <div className="todos_for_the_day" style={{ fontWeight:600, fontSize:20, marginBottom:'2%' }}>To Do's For {date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()} </div>
      <div className="todo_input">
        <input className="input_todo" type="text" required maxLength="20" value={Input} onChange={ e => setInput(e.target.value) } />
        <input className="input_time_todo" type="time" required value={inputTime} onChange={ e => setInputTime(e.target.value) } />
        <button className="add_todo" onClick={addTodo} >Add ToDo</button>
      </div>
      <div className="todos">
        {todos.map(todo => (
          <div>
            <ToDoItem key={todo.taskNo}
              todoItem={todo.taskName}
              taskNo={todo.taskNo}
              deadline={todo.taskComplete}
            />
            <div className="hrline" style={{ height:'0.2px', backgroundColor:'rgb(173,173,173)', marginTop:'1%', marginBottom:'1%' }} ></div>
          </div>
        ))}
      </div>
      <p id="warning">{warning}</p>
    </div>
  );
}

export default App;
