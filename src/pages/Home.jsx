import React from 'react'

const Home = () => {
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        <span className='text-2xl font-normal'>
            Welcome to the <span className='font-semibold'>Admin Dashboard</span> of Brgy. Manuyo Uno Las Piñas City
        </span>
        <br />
        <br />
        <span className='text-xl font-medium'>In this Admin Dashboard you can:</span>        
        <br />

        <ul className='list-disc ml-5 mt-2'>
           <li>View Residents Data</li> 
           <li>Broadcast SMS Text Message</li>
           <li>View Emails from Contact Form</li> 
           <li>View Voluteers information that sign up on the Volunteer form</li> 
        </ul>

        <br />
        <span className='text-xl font-medium'>What is Hygraph?</span> 
        <br />
        <ul className='list-disc ml-5 mt-2'>
           <li>Hygraph is an CMS (Content Management System)</li> 
           <li>A content management system (CMS) is a software application that enables users to create, edit, collaborate on, publish and store digital content.</li> 
           <li>We use a CMS to make it <strong>easy</strong> to change, delete, and add information to the Manuyo Uno Website. </li> 
        </ul>       
        
    </div>
  )
}

export default Home