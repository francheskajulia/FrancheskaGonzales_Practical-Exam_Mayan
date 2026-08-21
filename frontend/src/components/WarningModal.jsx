import { useState, useEffect } from 'react'
import '../App.css'
import { useTaskContext } from '../hook/useTaskContext';

function WarningModal({ isOpen, isClose, task, onSuccess, onError }) {
    const [ taskId, setTaskId ] = useState('');
    const { dispatch } = useTaskContext();

    useEffect(() => {
        if(task){
            setTaskId(task.task_id || '');
        }

    }, [task])

    if(!isOpen) return null;

    const deleteTask = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch(`/api/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            const json = await response.json();

            if(!response.ok){
                onError(json.error);
            }

            if(response.ok){
                isClose();
                dispatch({type: 'DELETE_TASK', payload: json.task[0]});
                onSuccess(json.message);
            }
        }catch(err){
            isClose();
            onError('Something went wrong. Please try again.');
        }
    }
    return (
        <>
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-xs'>
            <form onSubmit={deleteTask} className='slide-in2 w-90 rounded-lg px-4 py-3 bg-white'>
                <div className='flex justify-between items-center'>
                    <span className='text-sm font-bold'>Delete Task</span>
                    <button type='button'><i className="text-sm text-gray-400 fi fi-ss-cross-small"></i></button>
                </div>
                <div className='flex flex-col justify-center w-full items-center py-5'>
                    <span>Are you sure you want to delete</span>
                    <span className='text-center'>"<span className='text-red-800'>{task.title}</span>"?</span>
                    <span>This action cannot be undone.</span>
                </div>
                <div className='text-sm flex justify-between items-center gap-2 mt-3'>
                    <button type='button' onClick={isClose} className='flex-1 border border-gray-700 py-1  text-gray-700 rounded-md'>Cancel</button>
                    <button className='flex-1 border border-red-700 py-1 bg-red-800 text-white rounded-md'>Delete</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default WarningModal