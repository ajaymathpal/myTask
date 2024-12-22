import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos")) ||[]
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    saveToLS();
  }

  const handleAdd = () => {
    saveToLS();
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    saveToLS();
    setTodo("");
    
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS();
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (

    <>
      <Navbar />

      <div className='md:container md:mx-auto my-5 mx-3 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2'>
      <h1 className='font-bold text-center text-xl'>myTask - Manage your todos at one place</h1>

        <div className='addTodo'>
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type='text' className='w-3/4 rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
        </div>

        <input onChange={toggleFinished} className='mt-5' type='checkbox' checked={showFinished} />Show Finished
        <h2 className='text-lg font-bold my-5'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex md:w-1/2 w-[100%] my-3 justify-between' >

              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type='checkbox' checked={item.isCompleted}
                  name={item.id} id='' />
                  <div className={item.isCompleted ? "line-through" : ""}truncate w-full>{item.todo}</div>
              </div>

              <div className='buttons flex h-full lg:w-0'>
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit/></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete/></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App




