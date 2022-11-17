import React, {useState} from 'react'
import { Success, Bug } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useAuthContext } from '../hook/useAuthContext';

const AddResident = () => {
    const { dispatch, visible, setVisible } = useStateContext()
    const { admin } = useAuthContext()
    
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!admin) {
          setError('You must be logged in ')
          return
        }

        const resident = {name, address, phone}
        const response = await fetch('/api/resident', {
            method: 'POST',
            body: JSON.stringify(resident),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${admin.token}`
            }
        })
        const json = await response.json()

          if (!response.ok) {
              setError(json.error)
              setEmptyFields(json.emptyFields)
          }
          if (response.ok) {
              setError(null)
              setEmptyFields([])
              setSuccess('Data Added Successfully')
              setName('')
              setAddress('')
              setPhone('')
              dispatch({type: 'CREATE_RESIDENT', payload: json})
          }
    }

    const handleClose = () => {
      if(visible === true) {
        setVisible(false)
      }
    }


  return (
<div className="block p-6 rounded-lg shadow-lg bg-emerald-50 ">
            {error && <Bug message={error} />}
            {success && <Success message={success} />}
      <div className='bg-emerald-500 w-72 rounded-md '>
        <span className='font-semibold text-xl block mb-6 p-3 m-3 text-white'>ADD A NEW RESIDENT: </span>
      </div>
  <form className='relative' onSubmit={handleSubmit}>
    <div className="form-group mb-4 w-full">
      <label htmlFor="name" className="form-label inline-block mb-1 
        w-full text-gray-700">Name:</label>
      <input type="text" name='name' onChange={(e) => setName(e.target.value)} value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder="Enter Residents Name" required />
    </div>
    <div className="form-group mb-6">
      <label htmlFor="address" className="form-label inline-block mb-1 text-gray-700">Address:</label>
      <input type="text" name='address' onChange={(e) => setAddress(e.target.value)} value={address} className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Residents Address" required />
    </div>

    <div className="form-group mb-10">
      <label htmlFor="phone" className="form-label inline-block mb-1 text-gray-700">Phone Number:</label>
      <input type="number" name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="exampleInputPassword1"
        placeholder="Enter contact no." required />
    </div>
    <div className='relative'>
    <button onClick={handleClose} 
      className="px-8
      py-2.5
      bg-red-500
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      absolute bottom-0
      hover:bg-red-700 hover:shadow-lg
      focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-red-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Close</button>
    <button type="submit" 
        className="
        px-8
      py-2.5
      bg-emerald-500
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      absolute bottom-0 right-0 
      hover:bg-green-700 hover:shadow-lg
      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-green-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Add</button>
      
    </div>

  </form>
</div>

  )
}

export default AddResident