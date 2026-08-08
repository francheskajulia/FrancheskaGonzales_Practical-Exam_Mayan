import { TaskContext } from "../context/taskContext";
import { useContext } from "react";

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw Error('useTaskContext must be inside a TaskContext Provider')
    }

    return context
}