import { useState, useEffect } from 'react'

function StatusTag({ status }){
    const [color, setColor] = useState('');
    const statusColors = ['border-red-500 bg-red-100 text-red-500', 
                            'border-green-800 bg-green-100 text-green-800', 
                            'border-blue-500 bg-blue-100 text-blue-500', 
                            'border-gray-500 bg-gray-100 text-gray-500'];
    
    useEffect(() => {
        switch(status){
            case 'Incomplete':
                setColor(statusColors[0]);
                break;
            case 'Completed':
                setColor(statusColors[1]);
                break;
            case 'Active':
                setColor(statusColors[2]);
                break;
            default:
                setColor(statusColors[3]);
                break;
        }
    }, [status]);

    return(
        <span className={`w-fit border 
                        ${color} font-semibold
                        text-xs py-0.5 px-2 
                            rounded-sm`}>
                    {status}
        </span>
    )
}

export default StatusTag