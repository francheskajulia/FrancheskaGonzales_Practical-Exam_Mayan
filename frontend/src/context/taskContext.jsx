import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const taskReducer = (state, action) => {
    switch (action.type){
        case 'SET_TASKS':
            return{
                tasks : action.payload
            }
        case 'CREATE_TASK':
            return{
                tasks: [action.payload, ...state.tasks]
            }
        case 'UPDATE_TASK':
            return{
                ...state, tasks: state.tasks.map(task => 
                    task.task_id === action.payload.task_id ?
                    {...task, ...action.payload}
                    : task
                ) 
            }
        case 'DELETE_TASK':
            return{
                ...state, tasks: state.tasks.filter(task => 
                    task.task_id != action.payload.task_id
                )
            }
        default:
            return state;
    }
}

export const TaskContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: []
    })

    return(
        <TaskContext.Provider value={{...state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}