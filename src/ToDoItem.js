import React, {useState, useEffect} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import db from './firebase';
import './App.css'

export const ToDoItem = ( { id, todoItem, deadline, inputDate } ) => {


    const color = () => {
        if(deadline==="done")
            return {
                color:"gray",
                textDecorationLine:"line-through",
                marginLeft:'-3%'
            }
        else
            return {
                color:'black',
                marginLeft:'-3%'
            }
    }

    const symbol = () => {
        if(deadline==="done"){
            return String.fromCharCode(10004)
        }
        else
            return <ThumbUpAltIcon/>
    }
    
    const [notDone, Done] = useState(symbol)

    const [updateInput, setInput] = useState(todoItem)

    const [updateInputtime, setInputtime] = useState(deadline)

    const initStyle = {
        display:'none'
    }

    const finaStyle = {
        display:'flex',
        flexDirection:'row',
        top:0
    }

    const [updateInitStyle, updateFinstyle] = useState(initStyle)
    
    const EditTodo = (e) => {
        updateFinstyle(finaStyle)
    }

    const updateTodo = (e) => {
        db.collection('todos').doc(id).set({
            taskName:updateInput,
            taskComplete:updateInputtime
        }, {merge:true})
        updateFinstyle(initStyle)
    }
    
    const change = (e) => {
        Done(String.fromCharCode(10004))
        db.collection('todos').doc(id).set({
            taskComplete:"done"
        }, {merge:true})
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

    useEffect(() => {
        const date = new Date(inputDate.seconds*1000)
        const prDate = new Date()
        if(date.getDate() != prDate.getDate() || date.getMonth() != prDate.getMonth() || date.getFullYear() != prDate.getFullYear())
            db.collection('todos').doc(id).delete();  
    },[])


    return (
        <div className="each_todo">
            <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                <div className="task_name" id={id} style={color()}>{todoItem}</div>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                    <div className="task_before">{deadline}</div>
                    <div className="remove_todo" onClick={deleteTodo} style={{marginLeft:'5%',color:setColor()}}><DeleteIcon style={{ fontSize:25 }} /></div>
                    <div className="edit_task" onClick={EditTodo} style={{ marginRight:'5%', color:setColor()}} ><CreateIcon/></div>
                    <div className="task_complete" onClick={change} style={{ color:setColor()}}>{notDone}</div>
                </div>
            </div>
            <div className="update_todo" style={updateInitStyle}>
                <input placeholder={todoItem} onChange={ e => {
                            if(e.target.value==='')
                                setInput({todoItem}) 
                            else
                                setInput(e.target.value)
                        }
                    }/>
                <input type="time" placeholder={deadline} onChange={ e => {
                            if(e.target.value==='')
                                setInputtime({deadline})
                            else{
                                const date = new Date()
                                if(e.target.value.slice(0,2)<=date.getHours() && e.target.value.slice(3,)<date.getMinutes())
                                    window.alert("please enter valid time")
                                else
                                    setInputtime(e.target.value)
                            }
                        } 
                    }/>
                <button onClick={updateTodo} >Update Todo</button>
            </div>
        </div>
    )
}
