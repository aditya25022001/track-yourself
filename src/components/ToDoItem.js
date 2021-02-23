import React, {useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import '../App.css'

export const ToDoItem = ( { todoItem, deadline, taskNo } ) => {

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
            <div style={{ display:'flex', flexDirection:'row', alignItems:'center', marginRight:15 }} >
                <div className="task_number" style={{ marginRight:10 }} >{taskNo}<b>.</b></div>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
                    <div className="task_name">{todoItem}</div>
                </div>
            </div>
            <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                <div className="task_before" style={{ marginRight:'5%', marginLeft:'-5%' }}>{deadline}</div>
                <div className="edit_task"><CreateIcon/></div>
                <div className="task_complete" onClick={change} style={{ color:setColor() }}>{noteDone}</div>
            </div>
        </div>
    )
}
