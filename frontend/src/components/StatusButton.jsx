

function StatusButton({ status, icon, statusDetails, currentStatus }){

    const setStatus = (e) => {
        e.preventDefault();
        statusDetails(status);
    }

    return(
        <button className={`flex items-center cursor-pointer hover:opacity-100 px-3 
                            ${currentStatus === status ? 'opacity-100' : 'opacity-60'}`}
                onClick={setStatus}>
            <i className={`inline-block text-lg mt-1 -ml-1 fi fi-ss-bullet ${icon}`}></i>
            {status}
        </button>
    )
}

export default StatusButton