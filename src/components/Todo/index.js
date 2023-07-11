import {AiFillDelete} from 'react-icons/ai'


import './index.css'

const Todo = props => {
    const {todoList, updateTodoStatus, onDeleteTodo} = props

    const todosCompleted = todoList.filter(eachTodo => eachTodo.todoStatus)
    const todosYetToComplete = todoList.filter(eachTodo => !eachTodo.todoStatus)

    // console.log(`done : `,todosCompleted)
    // console.log(`not done`,todosYetToComplete)

    const updateTaskStatus = event => {
        // console.log(event.target.value)
        updateTodoStatus(event.target.value)
     } 

    const DeleteTodo = id => onDeleteTodo(id)

    return (
        <ul className="todo-list">
            {
                todosYetToComplete.map(eachTodo => {
                    const onClickDelete = () => DeleteTodo(eachTodo.id)
                    return (
                    <li className='item-div' key={eachTodo.id}>
                        <input type='checkbox' className='check-box' htmlFor={eachTodo}
                         value={eachTodo.id} onChange={updateTaskStatus} />
                        <div className='item'>
                            <p className='task-label'>{ eachTodo.task }</p>
                            <button onClick={onClickDelete} type='button' className='delete-btn'>
                                <AiFillDelete size="30" />
                            </button>
                        </div>
                    </li>
                )})
            }
            {
                todosCompleted.map(eachTodo => {
                    const onClickDelete = () => DeleteTodo(eachTodo.id)
                    return (
                    <li className='item-div' key={eachTodo.id}>
                        <input checked type='checkbox' className='check-box' htmlFor={eachTodo}
                         value={eachTodo.id} onChange={updateTaskStatus} />
                        <div className='item item-checked'>
                            <p className='task-label task-label-done'>{ eachTodo.task }</p>
                            <button onClick={onClickDelete} type='button' className='delete-btn'><AiFillDelete size="30" /></button>
                        </div>
                    </li>
                )})
            }
        </ul>
    )
}

export default Todo