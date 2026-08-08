import { useState, useEffect } from 'react'
import '../App.css'
import { useTaskContext } from '../hook/useTaskContext';

function AddTaskModal({ isOpen, isClose, onSuccess, onError }) {
    const { dispatch } = useTaskContext();
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState(null);

    if(!isOpen) return null;

    const saveTask = async(e) => {
        e.preventDefault();
        
        if(title.trim() != '' && description.trim() != ''){
            const task = {title, description};
            try{
                const response = await fetch(`/api/task/`, {
                    method: 'POST',
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
                    setTitle('');
                    setDescription('');
                    isClose();
                    onSuccess(json.message);
                    dispatch({type: 'CREATE_TASK', payload: json.task[0]});
                }
            }catch(err){
                isClose();
                onError('Something went wrong. Please try again.');
            }
        }else{
            setError(true);
        }
        
    }

    return (
        <>
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-xs'>
            <form onSubmit={saveTask} className='slide-in2 w-115 rounded-lg px-4 py-3 bg-white'>
                <div className='flex justify-between items-center border-b pb-2 border-b-gray-300'>
                    <span className='text-sm font-bold'>Add New Task</span>
                    <button type='button' onClick={isClose}><i className="text-sm text-gray-400 fi fi-ss-cross-small"></i></button>
                </div>
                <div className='flex flex-col py-3 gap-1'>
                    <label htmlFor="title" className='text-sm'>Task Title:</label>
                    <input type="text" className='text-sm bg-gray-100 rounded-md outline-0 py-1.5 px-2'
                            onChange={(e) => setTitle(e.target.value)} />
                    {error && title == '' ? <span className='text-[11px] text-red-700'>* Required Field</span> : ''}
                </div>
                <div className='flex flex-col py-3 gap-1'>
                    <label htmlFor="title" className='text-sm'>Description: </label>
                    <textarea rows='8' className='text-sm bg-gray-100 rounded-md outline-0 py-1.5 px-2' 
                                onChange={(e) => setDescription(e.target.value)}/>
                    {error && description == '' ? <span className='text-[11px] text-red-700'>* Required Field</span> : ''}
                </div>
                <div className='text-sm flex justify-between items-center gap-2 mt-3'>
                    <button onClick={isClose} className='flex-1 border border-gray-700 py-1  text-gray-700 rounded-md'>Cancel</button>
                    <button className='flex-1 primary-color text-white text-center py-1 border border-[#88a0ff] rounded-md'>Create</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AddTaskModal