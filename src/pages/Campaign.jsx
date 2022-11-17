import React, { useState } from 'react';
import { Header, Success, Bug } from '../components';

const Campaign = () => {
  const [numberm, setNumber] = useState('')
  const [messagem, setMessage] = useState('')
  const [sent, setSent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const numbers = numberm.split(' ')
    const numberJson = JSON.stringify(numbers)
    const sms = 
      {
        Email: process.env.REACT_APP_SMS_EMAIL,
        Password: process.env.REACT_APP_SMS_PASSWORD,
        Recipients: numberJson,
        Message: messagem,
        ApiCode: process.env.REACT_APP_SMS_APICODE,
      }
    const response = await fetch('https://api.itexmo.com/api/broadcast', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(sms),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  const json = await response.json()
    if (!response.ok) {
        setError(json.Message)
    }
    if (response.ok) {
        setSent('SMS Sent Successfully to: ' +numberm)
        setNumber('')
        setMessage('')
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Send SMS to residents" />
      <div>
        <form onSubmit={handleSubmit}>
          <div className='m-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="number">Send to: 
              <input 
                  className='sm:w-400 w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ' 
                  type="text" 
                  id='number'
                  placeholder='09123xxx 09124xxx' 
                  onChange={(e) => setNumber(e.target.value)} 
                  defaultValue={numberm}
                  required
                  onKeyPress={(event) => {
                      if (!/[0-9 ' ']/.test(event.key)) {
                          event.preventDefault();
                      }
                  }}
                  />
            </label>

            <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-900'>Message: 
              <textarea  
                    className='block p-2.5 sm:w-400 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                    placeholder="Your message..." 
                    name="message"
                    id="message" 
                    cols="5" 
                    rows="5"
                    onChange={(e) => setMessage(e.target.value)} 
                    value={messagem}
                    required
                    >
              </textarea>
            </label>

            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-400 w-80 px-5 py-2.5 text-center' type='submit'>
              Send
            </button>
          </div>
        </form>
        {sent && <Success message={sent} />}
        {error && <Bug message={error}/>}
      </div>
    </div>
  );
};
export default Campaign;