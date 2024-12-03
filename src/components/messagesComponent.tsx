

function ConfirmComponent ({setContinue}: {setContinue: React.Dispatch<React.SetStateAction<boolean>>}) {
    
    function handleClick() {
        setContinue(true)
    }

    return (
        <button className="user_button" onClick={handleClick}>¡Empecemos!</button>
    )
}

export default ConfirmComponent