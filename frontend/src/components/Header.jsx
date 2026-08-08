import { useState, useEffect } from 'react'

function Header({ pageTitle}){
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return(
        
        <div className='flex justify-between items-center'>
            <span className='text-2xl'>{pageTitle}</span>
            <span className='text-sm text-gray-500'>{date.toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'})}</span>
        </div>
    )
}

export default Header;