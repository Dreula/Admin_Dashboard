import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useAuthContext } from '../hook/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Post = ({announcement}) => {
        
    const { admin } = useAuthContext()

    const handleClick = async () => {
        const response = await fetch('/api/announcement/' + announcement._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${admin.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          alert('Delete Successful, Title: '+ json.title)
        }
      }

  return (
    
    <div className='relative float-left m-2 md:m-10 mt-24 p-5 md:p-1 bg-white rounded-3xl shadow-2xl'>
        <div className='p-5'>
            <div className='block mb-2 text-sm font-bold text-gray-900'>
              Title: <span className='font-medium'> {announcement.title}</span>  
            </div>
            <div className='block mb-2 text-sm font-bold text-gray-900'>
                Date: <span className='font-medium'> {announcement.date}</span> 
            </div>
            <div className='block mb-2 text-sm font-bold text-gray-900'>
                Time: <span className='font-medium'> {announcement.time}</span> 
            </div>
            <div className='block mb-2 text-sm font-bold text-gray-900'>
                Description: <span className='font-medium'> {announcement.desc}</span> 
            </div>
            <p className='inline text-sm'>Posted: {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}</p>
            <button onClick={handleClick} className='absolute inline-block float-right top-5 right-5 cursor-pointer hover:bg-red-300 hover:rounded-md p-2' ><RiDeleteBinLine title='Delete' size={22} color={"rgb(197,0,0)"} /> </button>
    </div></div>
  )
}

export default Post