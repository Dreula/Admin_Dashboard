import React, { useState, useEffect, useRef } from 'react'
import { useAuthContext } from '../hook/useAuthContext';
import { Success, Bug, Post } from '../components';

const WebPosts = () => {

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [desc, setDesc] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { admin } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

        if (!admin) {
          setError('You must be logged in ')
          return
        }

        const announcement = {title, date, time, desc}
        const response = await fetch('/api/announcement', {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${admin.token}`
            }
        })
        const json = await response.json()
          if (!response.ok) {
              setError(json.error)
          }
          if (response.ok) {
              setError(null)
              setSuccess('Announcement Posted Successfully')
              setTitle('')
              setDate('')
              setTime('')
              setDesc('')
              alert('Post Success')
              //dispatch({type: 'CREATE_announcement', payload: json})
          }
  }

  const [announcements, setAnnouncements] = useState(null)

  useEffect(() => {
    let isMounted = true;

      const fetchPosts = async () => {
      const response = await fetch('/api/announcement', {
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
            setAnnouncements(json)
          }
        }
      
      }
      fetchPosts()
      return () => {
        isMounted = false
        }
  }, [announcements])

  return (
    <div>
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl text-xl shadow-md'>
          <span className='text-xl font-semibold'>
            Official Website of Brgy. Manuyo Uno
          </span> 
          <br />
          Link to: {' '}
          <span className='text-blue-500 font-bold underline'><a href="https://waste-blog.vercel.app/" target="_blank">WEBSITE</a></span>
          <br />
          <br />
          To post new contents on the Website please use <strong>Hygraph</strong>
          <br />
          Link to: {' '}
          <span className='text-blue-500 font-bold underline'><a href="https://app.hygraph.com/e8b59e740b7e4bc3a37c0f0134d3aee6/master" target="_blank">HYGRAPH</a></span>
      </div>

      <div className='m-2 mx-auto md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl text-xl shadow-lg'>
          <span className='block font-semibold text-xl lg:p-0 sm:p-5'>Post an Announcement</span>

          <form onSubmit={handleSubmit}>
          <div className='m-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="number">Title: 
              <input 
                  className='w-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ' 
                  type="text" 
                  id='title'
                  name='title'
                  placeholder='Agenda for the Month of...' 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title}
                  required
                  />
            </label>

            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="number">Date: 
              <input 
                  type="text"
                  onChange={(e) => setDate(e.target.value)} 
                  value={date}  
                  placeholder='November 22, 2022' 
                  required
                  className='p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 block' />
                  
            </label>

            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="number">Time: 
              <input 
                  type="text" 
                  onChange={(e) => setTime(e.target.value)} 
                  value={time}
                  placeholder='1:00 PM - 2:30 PM' 
                  required
                  className='p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 block' />
            </label>

            <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-900'>Description: 
              <textarea  
                    className='block p-2.5 w-400 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                    placeholder="Planning for the..." 
                    name="desc"
                    id="desc" 
                    cols="2" 
                    rows="2"
                    onChange={(e) => setDesc(e.target.value)} 
                    value={desc}
                    required
                    >
              </textarea>
            </label>

            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='submit'>
              Post
            </button>
            {error && <Bug message={error} />}
            {success && <Success message={success} />}
          </div>
        </form>
      </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2'>
          {announcements && announcements.map((announcement) => (
                  <Post key={announcement._id} announcement={announcement} />
          ))}
      </div>
      
    </div>
  )
}

export default WebPosts
