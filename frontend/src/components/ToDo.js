import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

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
        <div className="flex flex-col m-10 gap-10 items-center font-sans">
            <h1 className="text-4xl">To-Do list</h1>
            <div className="flex gap-10 text-lg">
                <input type="text" className="w-80 border h-10 pl-4 outline-none focus:border-black rounded-lg" ref={task} placeholder="Enter task" />
                {update ? <button className="btn" onClick={handleUpdateItem}>Update</button> : <button className="btn" onClick={handleSubmit}>Add</button>}
            </div>
            <div>
                {todos.map(todo => (
                    <div key={todo._id} className="flex gap-4">
                        <p>{todo.task}</p>
                        <button className="border border-gray-600" onClick={() => handleUpdate(todo)}>Update</button>
                        <button className="border border-gray-600" onClick={() => handleDelete(todo)}>Delete</button>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default ToDo;