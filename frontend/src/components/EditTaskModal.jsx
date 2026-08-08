import { useState, useEffect } from 'react'
import '../App.css'
import { useTaskContext } from '../hook/useTaskContext';

function EditTaskModal({ taskDetails, isOpen, isClose, deleteDetails, onSuccess, onError }) {
    const { dispatch } = useTaskContext();
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ taskId, setTaskId ] = useState('');
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if(taskDetails) {
            setTitle(taskDetails.title || '');
            setDescription(taskDetails.description || '');
            setTaskId(taskDetails.task_id);
        }
    }, [taskDetails])
    if(!isOpen) return null;

    const saveTask = async(e) => {
        e.preventDefault();
        
        if(title != '' && description != ''){
            const task = {title, description};
            const response = await fetch(`/api/task/${taskId}`, {
                method: 'PATCH',
                body: JSON.stringify(task),
                headers:{
                    'Content-Type' : 'application/json'
                }
            })

            const json = await response.json();

            if(!response.ok){
                onError(json.error);
            }

            if(response.ok){
                isClose();
                onSuccess(json.message);
                dispatch({type: 'UPDATE_TASK', payload: json.task[0]});
                console.log(json.task[0]);
            }
        }else{
            setError(true);
        }
        
    }

    const deleteTask = (e) => {
        e.preventDefault();
        deleteDetails(taskDetails);
    }

    return (
        <>
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-xs'>
            <form  onSubmit={saveTask} className='slide-in2 w-115 rounded-lg px-4 py-3 bg-white'>
                <div className='flex justify-between items-center border-b pb-2 border-b-gray-300'>
                    <span className='text-sm font-bold'>Edit Task</span>
                    <button type='button' onClick={isClose}><i className="text-sm text-gray-400 fi fi-ss-cross-small"></i></button>
                </div>
                <div className='flex flex-col py-3 gap-1'>
                    <label htmlFor="title" className='text-sm'>Task Title:</label>
                    <input type="text" className='text-sm bg-gray-100 rounded-md outline-0 py-1.5 px-2'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    {error && title == '' ? <span className='text-[11px] text-red-700'>* Required Field</span> : ''}
                </div>
                <div className='flex flex-col py-3 gap-1'>
                    <label htmlFor="title" className='text-sm'>Description: </label>
                    <textarea rows='8' className='text-sm bg-gray-100 rounded-md outline-0 py-1.5 px-2' 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                    {error && description == '' ? <span className='text-[11px] text-red-700'>* Required Field</span> : ''}
                </div>
                <div className='text-sm flex justify-between items-center gap-2 mt-3'>
                    <button onClick={deleteTask} className='flex-1 border border-red-700 py-1 bg-red-800 text-white rounded-md'>Delete</button>
                    <button className='flex-1 primary-color text-white text-center py-1 border border-[#88a0ff] rounded-md'>Save</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditTaskModal