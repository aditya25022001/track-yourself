import React, {useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import db from './firebase';
import './App.css'

export const ToDoItem = ( { id, todoItem, deadline } ) => {

    const [noteDone, Done] = useState(<ThumbUpAltIcon/>)
    
    const inStyle = {
        marginLeft:'-3%',
        textDecoration:'none',
        color:'black'
    } 

    const finStyle = {
        marginLeft:'-3%',
        textDecoration:'line-through',
        color:'gray'
    }

    const [styleTodoItem, setStyleTodoItem] = useState(inStyle)
    
    const change = (e) => {
        Done(String.fromCharCode(10004))
        setStyleTodoItem(finStyle);
    }
    
    const deleteTodo = (e) => {
        db.collection('todos').doc(id).delete();
    }

    const setColor = () => {
        let rvalue=0.8-Math.random();
        let gvalue=0.8-Math.random();
        let bvalue=0.8-Math.random();
        return `rgb(${rvalue*255},${gvalue*255},${bvalue*255})`
    }

    return (
        <div className="each_todo">
            <div className="task_name" style={styleTodoItem}>{todoItem}</div>
            <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                <div className="task_before">{deadline}</div>
                <div className="remove_todo" onClick={deleteTodo} style={{marginLeft:'5%',color:setColor()}}><DeleteIcon style={{ fontSize:25 }} /></div>
                <div className="edit_task" style={{ marginRight:'5%', color:setColor()}} ><CreateIcon/></div>
                <div className="task_complete" onClick={change} style={{ color:setColor()}}>{noteDone}</div>
            </div>
        </div>
    )
}
