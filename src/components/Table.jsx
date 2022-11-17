import React, { useState } from 'react'
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useResidentContext } from '../hook/useStateContext';
import { useStateContext } from '../contexts/ContextProvider';
import { useAuthContext } from '../hook/useAuthContext';


const Table = ( {residents} ) => {

  return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    
                <table className="min-w-full">
                    <thead className="bg-white border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Name
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Address
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Phone Number
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {residents && residents.map((residents, i) => 
                        <Tr {...residents} key={i} />
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
  )
}

function Tr({_id, name, address, phone}){

    const {dispatch } = useResidentContext()
    const { setFlag, setUpdate, setVisible, visible } = useStateContext();
    const { admin } = useAuthContext()

    const handleUpdate = async () => {
        setFlag(true);
        setUpdate(_id);
        setVisible(false)
    }

    const handleDelete = async () => {

        if (!admin) {
            return
          }

        const response = await fetch('/api/resident/' + _id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${admin.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_RESIDENT', payload: json})
        }
    }

    return (
        <tr key={_id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {address}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {phone}
            </td>
            <td className="py-2 flex gap-5">
                <button className="cursor" onClick={handleUpdate}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
                <button className="cursor" onClick={() => { if (window.confirm('Are you sure you want to delete this?')) handleDelete() } }><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
            </td>
        </tr>
    )
}


export default Table;