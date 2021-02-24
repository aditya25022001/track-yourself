import React, {useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './App.css'

export const ToDoItem = ( { todoItem, deadline } ) => {

    const [noteDone, Done] = useState(<ThumbUpAltIcon/>)
    const change = (e) => {
        Done(String.fromCharCode(10004))
    }
    
    const setColor = () => {
        let rvalue=0.8-Math.random();
        let gvalue=0.8-Math.random();
        let bvalue=0.8-Math.random();
        return `rgb(${rvalue*255},${gvalue*255},${bvalue*255})`
    }

    return (
        <div className="each_todo">
            <div className="task_name" style={{ marginLeft:'-8%', marginRight:'5%' }} >{todoItem}</div>
            <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                <div className="task_before" style={{marginLeft:'5%', marginRight:'12%' }}>{deadline}</div>
                <div className="edit_task" style={{ marginRight:'5%' }} ><CreateIcon/></div>
                <div className="task_complete" onClick={change} style={{ color:setColor() }}>{noteDone}</div>
            </div>
        </div>
    )
}
