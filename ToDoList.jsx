import React, { useState } from 'react'
import "./todoList.css";
 
function ToDoItem({id, value, isChecked, deleteItem, onChecked}) {
    return (<li key={id} className={`listItems itemRow ${isChecked ? 'checked':''}`}>
        <input 
            type="checkbox"
            checked={isChecked}
            onChange={onChecked}
        />    
        {value}
        <button onClick={deleteItem}>X</button>
    </li>)
}

export default function ToDoList() {

    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);
     
    function addItem() {
        const elem = {
            id: Math.floor(Math.random() * 1000),
            value: input,
            isChecked: false
        }
        setItems([...items, elem]);
        setInput("")
    }

    function deleteItem(id) {
        setItems([...items.filter((item) => item.id !== id)])
    }

    function onChecked(id) {
        for(const item of items) { 
            if(item.id === id)
                item.isChecked = !item.isChecked; 
        }
        setItems([...items]);
    }
 
    return (
        <div className="form">
            <div className='inputWrapper'>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value) }
                />
                <button onClick={addItem}>Add</button>
            </div>
            <ul className="itemsContainer">
                {items.map(
                    (item) => <ToDoItem 
                        key={item.id} 
                        {...item} 
                        deleteItem={() => deleteItem(item.id)}
                        onChecked={() => onChecked(item.id)}
                    />
                )}
            </ul>
        </div>
    )
}