import React, {useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import '../App.css'

export const ToDoItem = ( { todoItem, deadline, taskNo } ) => {

    const [noteDone, Done] = useState(<ThumbUpAltIcon/>)
    const change = (e) => {
        Done(String.fromCharCode(10004))
    }

    return (
        <div className="each_todo">
            <div className="task_number" style={{ marginRight:'2%', paddingLeft:'-2%' }}>{taskNo}<b>.</b></div>
            <div className="task_name" style={{ flexWrap:'wrap'}} >{todoItem}</div>
            <div className="task_before">{deadline}</div>
            <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                <div className="edit_task"><CreateIcon /></div>
                <div className="task_complete" onClick={change}>{noteDone}</div>
            </div>
        </div>
    )
}
