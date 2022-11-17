import { data } from 'autoprefixer';
import React, {useState, useEffect} from 'react'
import { Success, Bug } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useResidentContext } from '../hook/useStateContext';
import { useAuthContext } from '../hook/useAuthContext';

const UpdateResident = () => {

  const { setFlag, flag, update } = useStateContext();
  const {dispatch, state } = useResidentContext()
  const { admin } = useAuthContext()

  const [resident, setResident] = useState('')
  const handleClose = () => {
    if(flag === true) {
      setFlag(false)
    }
  }

  const [nameN, setName] = useState('')
  const [addressN, setAddress] = useState('')
  const [phoneN, setPhone] = useState('')

  useEffect(() => {
    const fetchResident = async () => {
      const response = await fetch('/api/resident/' + update, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.token}`
        }
    })
      const json = await response.json()

      if (!response.ok) {
        console.log(json.error)
      }
      if (response.ok) {
        setResident(json)
      }
    }

    fetchResident()
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!admin) {
      alert('admin???')
      return
    }

    let name, address, phone
    if (nameN.length == 0 ) {
      name = resident.name
    }
    if (nameN.length != 0){
      name = nameN
    }
    if (addressN.length == 0 ) {
      address = resident.address
    }
    if (addressN.length != 0){
      address = addressN
    }
    if (phoneN.length == 0 ) {
      phone = resident.phone
    }
    if (phoneN.length != 0){
      phone = phoneN
    }

    const form = {name, address, phone}

    const response = await fetch('/api/resident/' + update, {
       method: 'PATCH',
       body: JSON.stringify(form),
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${admin.token}`
        } 
    })
    const json = await response.json()
      
    if(!response.ok) {
      console.log(json.error)
    }
    if (response.ok) {
      dispatch({type: 'UPDATE_RESIDENT', payload: json})
      setName('')
      setAddress('')
      setPhone('')
      setFlag(false)
    }
  }

return (
<div className="block p-6 rounded-lg shadow-lg bg-yellow-50">
  <div className='bg-yellow-500 w-72 rounded-md'>
      <span className='font-semibold text-xl block mb-6 p-3 m-3 text-white'>UPDATE RESIDENT DATA: </span>
  </div>
  <form className='relative' onSubmit={handleSubmit}>
    <div className="resident-group mb-4 w-full">
      <label htmlFor="name" className="resident-label inline-block mb-1 
        w-full text-gray-700">Name:</label>
      <input type="text" name='name' onChange={(e) => setName(e.target.value)} defaultValue={resident.name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder={resident.name} />
    </div>
    <div className="resident-group mb-6">
      <label htmlFor="address" className="resident-label inline-block mb-1 text-gray-700">Address:</label>
      <input type="text" name='address' onChange={(e) => setAddress(e.target.value)} defaultValue={resident.address}
        className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
        placeholder={resident.address} />
    </div>

    <div className="resident-group mb-10">
      <label htmlFor="phone" className="resident-label inline-block mb-1 text-gray-700">Phone Number:</label>
      <input type="number" name='phone' onChange={(e) => setPhone(e.target.value)} defaultValue={resident.phone}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="exampleInputPassword1"
        placeholder={resident.phone} />
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
      bg-yellow-500
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      absolute bottom-0 right-0 
      hover:bg-yellow-700 hover:shadow-lg
      focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-yellow-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Update</button>
      
    </div>

  </form>
</div>

  )
}

export default UpdateResident