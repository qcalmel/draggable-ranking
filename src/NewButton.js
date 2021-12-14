import {useRef, useState} from "react";

const NewButton = ({onNewInput}) => {
    const [newList, setNewList] = useState(false)
    const [inputText, setInputText] = useState('')
    const newListButtonRef = useRef()
    const handleChange = (e) => {
        setInputText(e.target.value)
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            onNewInput(inputText)
            setInputText('')
            setNewList(false)
        }
    }
    const handleNewList = () => {
        setNewList(true)
    }
    const resetButton = (e) => {
        setNewList(false)
    }
    return (
        <div ref={newListButtonRef}>
            {newList ?
                (<input type='text' value={inputText} onChange={handleChange} onBlur={resetButton} onKeyDown={handleKeyDown} autoFocus={true}/>)
                :
                (<div onClick={handleNewList} >+</div>)
            }
        </div>
    )
}

export default NewButton