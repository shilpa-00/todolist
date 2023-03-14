import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import {AiFillDelete} from 'react-icons/ai';
import {MdModeEditOutline} from 'react-icons/md';

const ToDo = () => {
    const task = useRef();
    const [todos, setTodos] = useState([]);
    const [update, setUpdate] = useState(false);
    const [updateId, setUpdateId] = useState('')
    useEffect(() => {
        axios.get("http://localhost:5000/task/read")
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => {
                console.log('Error')
            })
    }, [])
    // useEffect(()=>{
    //     console.log(todos)
    // },[todos])
    const handleSubmit = async () => {
        if (task.current.value !== '') {
            axios.post("http://localhost:5000/task/create", { task: task.current.value })
                .then(response => {
                    // console.log('Before'+todos)
                    setTodos([...todos, { _id: response.data._id, task: task.current.value }]);
                    // console.log(response.data._id);
                    task.current.value = '';
                })
                .catch(error => {
                    console.log('Error inserting task')
                })
        }
        else {
            alert("Empty task")
        }
    }
    const handleDelete = (todo) => {
        // console.log(todo._id)
        axios.delete(`http://localhost:5000/task/delete/${todo._id}`)
            .then(response => {
                setTodos(todos.filter(item => item !== todo))
                // console.log(response.data)
            })
            .catch(error => {
                console.log('Error')
            })
    }
    const handleUpdateItem = () => {
        if (task.current.value !== '') {
            axios.put("http://localhost:5000/task/update", {
                _id: updateId,
                task: task.current.value
            })
                .then(response => {
                    console.log(response.data)
                    setTodos([...todos, { _id: response.data._id, task: task.current.value }])
                    setUpdate(false);
                    setUpdateId('');
                    task.current.value = ''
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            alert('Empty task')
        }
    }
    const handleUpdate = (todo) => {
        setTodos(todos.filter(item => item !== todo))
        task.current.value = todo.task
        task.current.focus()
        setUpdate(true);
        setUpdateId(todo._id)
    }
    return (
        <div className="flex flex-col gap-10 items-center font-sans text-white">
            <h1 className="text-6xl pt-10 font-bold text-blue-400">To-Do List</h1>
            <div className="flex gap-10 pt-10 text-lg">
                <input type="text" className="w-96 border h-10 pl-4 outline-none focus:border-black rounded-lg text-black shadow-md shadow-blue-400" ref={task} placeholder="Enter task" />
                {update ? <button className="btn" onClick={handleUpdateItem}>Update</button> : <button className="btn" onClick={handleSubmit}>Add</button>}
            </div>
            <div className="flex flex-col pt-4 items-center w-screen">
                {todos.map(todo => (
                    <div key={todo._id} className="flex justify-between w-1/4 border border-blue-400 p-2 text-lg">
                        <p>{todo.task}</p>
                        <div className="flex gap-4">
                            <button className="" onClick={() => handleUpdate(todo)}><MdModeEditOutline className="hover:text-blue-400"/></button>
                            <button className="" onClick={() => handleDelete(todo)}><AiFillDelete className="hover:text-blue-400"/></button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default ToDo;