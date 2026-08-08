import Header from '../components/Header'
import { useState, useEffect } from 'react'
import StatusButton from '../components/StatusButton'
import Task from '../components/Task'
import { useTaskContext } from '../hook/useTaskContext'
import WarningModal from '../components/WarningModal'
import AddTaskModal from '../components/AddTaskModal'
import EditTaskModal from '../components/EditTaskModal'


function Tasks(){
    const { tasks, dispatch } = useTaskContext();
    const [ status, setStatus ] = useState('All');
    const [ search, setSearch ] = useState('');
    const [ taskDetails, setTaskDetails ] = useState(null);
    const [ warningModal, setWarningModal ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            let response;
            if(search !== ''){
                response = await fetch(`/api/task/${status}/${search}`);
            }else{
                response = await fetch(`/api/task/${status}`);
            }
            const json = await response.json();
        
            if (response.ok){
                dispatch({type: 'SET_TASKS', payload: json});
            }
        }

        fetchTasks();

    }, [status, search]);

    useEffect(() => {
        if(successMessage){
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 4000)

            return () => clearTimeout(timer);
        }
    }, [successMessage])

    useEffect(() => {
        if(errorMessage){
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 4000)

            return () => clearTimeout(timer);
        }
    }, [errorMessage])

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    }

    const handleUpdateMark = (details) => {
        setTaskDetails(details);
        setWarningModal(true);
        console.log(details)
    }

    const handleEditTask = (details) => {
        setTaskDetails(details);
        setEditModal(true);
    }

    const handleDeleteTask = (details) => {
        setTaskDetails(details);
        setEditModal(false);
        setWarningModal(true);
    }

    const handleSuccessMessage = (message) => {
        setSuccessMessage(message);
    }

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
    }

    const removeFilter = () => {
        setStatus('All');
        setSearch('');
    }

    return(
        <div className='outfit-500 relative  bg-gray-50'>
            
            <div className='flex flex-col gap-9 bg-gray-50 min-h-screen px-10 lg:px-30 py-8'>
                <Header pageTitle="My Tasks"/>
                <div className='flex justify-between items-center flex-col lg:flex-row lg:flex-nowrap border-b border-gray-400 pb-3 gap-y-3 '>
                    <div className='flex overflow-x-auto gap-3 scrollbar-hide'>
                        <StatusButton status="All" currentStatus={status} icon='text-slate-600' statusDetails={handleStatusChange}/>
                        <StatusButton status="Active" currentStatus={status} icon='text-blue-600' statusDetails={handleStatusChange}/>
                        <StatusButton status="Completed" currentStatus={status} icon='text-green-600' statusDetails={handleStatusChange}/>
                        <StatusButton status="Incomplete" currentStatus={status} icon='text-red-600' statusDetails={handleStatusChange}/>
                    </div> 
                    <div className='flex gap-4 items-center'>
                        <div className='relative'>
                            <input type="text" placeholder="Search Task..." 
                                className="border border-gray-300 rounded-md py-2 
                                px-3 text-sm focus:outline-none focus:ring focus:ring-gray-300"
                                value={search} onChange={(e) => setSearch(e.target.value)}/>
                            {search && <button className='absolute right-3 top-1.5 text-gray-600'
                                                onClick={removeFilter}>×</button>}
                        </div>
                        <button className='primary-color rounded-sm text-sm text-white px-8 py-2 cursor-pointer'
                                onClick={() => setAddModal(true)}>
                            <span className='text-md mr-1'>+</span>
                            Add New
                        </button>
                    </div> 
                </div>
                {successMessage && <span className='text-sm w-full bg-green-300 p-2 text-center text-green-900 rounded-sm'>{successMessage}</span>}
                {errorMessage && <span className='text-sm w-full bg-red-200 p-2 text-center text-red-900 rounded-sm'>{errorMessage}</span>}
                <div className='grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'>
                    {tasks.length > 0 ? tasks.map((task) => (
                        <Task key={task.task_id} task={task} 
                            markTask={handleUpdateMark}
                            editTask={handleEditTask}
                            onSuccess={handleSuccessMessage}
                            onError={handleErrorMessage}/>
                    )) : (
                        <p className='text-gray-500'>No tasks found.</p>
                    )}
                </div>
            </div>
            <WarningModal isOpen={warningModal} task={taskDetails} onSuccess={handleSuccessMessage} 
                            isClose={() => setWarningModal(false)} onError={handleErrorMessage}/>
            <AddTaskModal isOpen={addModal} isClose={() => setAddModal(false)} onSuccess={handleSuccessMessage} 
                            onError={handleErrorMessage}/>
            <EditTaskModal isOpen={editModal} isClose={() => setEditModal(false)} 
                            taskDetails={taskDetails} deleteDetails={handleDeleteTask}
                            onSuccess={handleSuccessMessage}
                            onError={handleErrorMessage}/>
        </div>
        
    )
}

export default Tasks