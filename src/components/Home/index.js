import {v4 as uuidv4} from 'uuid'
import {useState} from "react"

import Todo from '../Todo'
import "./index.css"


const todoListKey = 'todos_key'

const Home = () => {
    const todoList = localStorage.getItem(todoListKey)
    const parsedList = JSON.parse(todoList)
    const listToParse = todoList=== null ? [] : parsedList 

    const [todos, setTodoList] = useState(listToParse)
    const [userInput, setUserInput] = useState("")

    const saveTodosList = () => {
        // console.log(todos)
        localStorage.clear()
        localStorage.setItem(todoListKey, JSON.stringify(todos))
    }

    const changeInput = (event) => {setUserInput(event.target.value)}

    const onDeleteTodo = (id) => {
        const newTodoList = todos.filter(eachTodo => id !== eachTodo.id)
        localStorage.clear()
        localStorage.setItem(todoListKey, JSON.stringify(newTodoList))
        setTodoList(newTodoList)
    }

    const updateTodoStatus = id => {
        // console.log(todos)
        todos.map((eachTodo) => {
            if (eachTodo.id === id){
                eachTodo.todoStatus = !eachTodo.todoStatus;
                return null
            }
            return null
        })
        const newTodos = [...todos]
        // console.log(todos)
        setTodoList(newTodos)
    }

    const addTodo = () => {
        if (userInput === ""){
            return
        }
        const todoItem = {
            task: userInput,
            id: uuidv4(),
            todoStatus: false
        }
        setTodoList((preList) => [...preList, todoItem])
        setUserInput("")
    }

    return(<div className="home-bg">
        <div className='todo-items-card'>
            <h1 className='heading'>Todo App</h1>
            <div className="input-area">
                <input type = "text" onChange={changeInput} value={userInput}
                placeholder='Enter your Task' className='input-element'/>
                <button type="button" onClick={addTodo} className='add-btn'>Add</button>
            </div>
            <Todo 
            todoList={todos} onDeleteTodo={onDeleteTodo} updateTodoStatus={updateTodoStatus} className="todos"
            />
            <button type='button' onClick={saveTodosList} className='save-btn'>Save</button>
        </div>
    </div>)
}

export default Home