import { useState } from 'react';
import StatusTag from '../components/StatusTag'
import { useTaskContext } from '../hook/useTaskContext';

function Task({ task, markTask, editTask, onSuccess, onError }){
    const { dispatch } = useTaskContext();

    const MarkTask = async(e, status, taskId) => {
        try{
            const response = await fetch(`/api/task/mark/${taskId}`, {
                method: 'PATCH',
                body: JSON.stringify({status}),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            const json = await response.json();

            if(!response.ok){
                onError(json.error);
            }

            if(response.ok){
                onSuccess(json.message);
                dispatch({type: 'UPDATE_TASK', payload: json.task[0]})
            }
        }catch(err){
            onError('Something went wrong. Please try again.');
        }
    }

    const edit = () => {
        editTask(task);
    }

    return(
        <div>
            <div className='grid grid-rows-[0.1fr_0.1fr_1fr_0.1fr] h-full gap-3 border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-xs'>
                <div className='flex justify-between items-center'>
                    <StatusTag status={task.status}/>
                    <button className='w-fit cursor-pointer'
                            onClick={edit}>
                        <i className=" text-gray-500 text-xs fi fi-ss-pencil"></i>
                    </button>
                </div>
                <span className='wrap-anywhere text-md font-bold'>{task.title}</span>
                <p className='text-sm -mt-2 text-justify text-gray-500'>{task.description}</p>

                {task.status != 'Completed' && task.status != 'Incomplete' ? (<div className='border-t border-gray-300 pt-3 flex justify-end items-center'>
                    <button className='bg-green-900 hover:bg-green-800 text-white text-sm 
                                        py-1 px-3 rounded-md mr-2 cursor-pointer'
                            onClick={(e) => MarkTask(e, 'Completed', task.task_id)}>
                        ✓ Complete
                    </button>
                    <button className='bg-red-900 hover:bg-red-800 text-white text-sm 
                                        py-1 px-3 rounded-md cursor-pointer'
                                        onClick={(e) => MarkTask(e, 'Incomplete', task.task_id)}>
                        × Incomplete
                    </button>
                </div>) : (<div className='flex justify-between items-center border-t border-gray-300 pt-3 text-sm'>
                    <span>Marked on: </span>
                    <span> {new Date(task.updated_at).toLocaleDateString('en-PH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }).replace(' at ', '  ')}</span>
                </div>)}
                
            </div>

           
        </div>
    )
}

export default Task