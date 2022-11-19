import React from "react"

const ActionButton: React.FC<{onClick: () => void}> = ({onClick}) => {
    return <div className="absolute bottom-10 right-[10vw]">
        <button onClick={onClick} className="bg-sky-500 text-white p-4 rounded-full">Add</button>
    </div>;
}

export default ActionButton;