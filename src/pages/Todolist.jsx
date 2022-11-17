import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { useAuthContext } from '../hook/useAuthContext'

const Todolist = () => {
  const { admin } = useAuthContext()
  const [todos, setTodo] = useState('')
  const [list, setList] = useState('')

  const handleAdd = async () => {

    if (!admin) {
      alert('You must be logged in ')
      return
    }
    const list = {todos}
    const response = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.token}`
      }
    })
    const json = await response.json()
          if (!response.ok) {
              alert('Error: '+ json.error)
          }
          if (response.ok) {
              setTodo('')
          }
  }

  useEffect(() => {
    let isMounted = true
    const fetchTodos = async () => {
    const response = await fetch('/api/todo', {
        headers: {
            'Authorization': `Bearer ${admin.token}`
          }
    })
    const json = await response.json()

      if (!response.ok) {
            console.log(json.error)
      }
      if (response.ok) {
        if(isMounted){
          setList(json)
        }
      }
    
    }
    fetchTodos()
    return () => {
      isMounted = false
      }
  }, [list])

  return (
  <div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-2xl">
      <Header category="App" title="To-Do-List" />
      <h1 className="text-grey-darkest">Todo List of :&nbsp; {admin.email}</h1>
        <div className="bg-white rounded shadow-md p-6 m-4 sm:w-full w-96 lg:w-3/4 ">
            <div className="mb-4">
                <div className="flex mt-4">
                    <input 
                        onChange={(e) => setTodo(e.target.value)}
                        value={todos}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                        placeholder="Add Todo" />
                    <button
                        onClick={() => handleAdd()} 
                        className="flex-no-shrink p-2 border-2 rounded text-blue-600 border-blue-600 hover:text-white hover:bg-blue-700">
                          Add
                    </button>
                </div>
            </div>
            <div>
            <span>Todo:</span>
                <div className="m-2 ml-5 block">
                {list && list.map((todo, i)=> 
                  <List {...todo} key={i}/>
                )}
                    
                </div>
      </div>
      </div>
    </div>
  </div>
  )
  };

  function List({ _id, todos}){
    const { admin } = useAuthContext()

    const handleDelete = async () => {
      const response = await fetch('/api/todo/' + _id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${admin.token}`
        }
      })
      const json = await response.json()
  
      if (response.ok) {
        alert('Delete Successful: '+ json.todos)
      }
    }

    return (
      <li key={_id} className='relative p-2 my-2 ml-5' >
          {todos}
          <button 
              onClick={handleDelete}
              className="absolute inline right-0 flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600">
            Delete
          </button>
      </li>
    )
  }

export default Todolist; 