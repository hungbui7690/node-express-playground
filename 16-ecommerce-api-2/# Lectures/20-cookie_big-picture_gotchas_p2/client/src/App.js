/*
  Cookie - Big Picture & Gotchas
  - Note: this lesson will have 2 servers:
    + react server
    + nodeJS server


**************************

  - const rootUrl = 'http://localhost:5000'
    + this is the link to nodeJS server when making request 
  

  - Client
    1. package.json
      -> "proxy": "http://localhost:5000"
    2. restart server
    3. because all request will be redirected to http://localhost:5000 -> use "after"
      + before: const url = `${rootUrl}/api/v1/auth/login`
      + after : const url = `/api/v1/auth/login`;


  - Server
    1. install cors package -> since same domain (localhost) -> without this package, no access to any resources in server
    2. after login -> we won't see cookie in frontend & backend
      => this is the downside of cookie -> just can send cookie to the same domain

      
  - now, cookie will appear in front and back
  - this is the way create-react-app setup -> this is not for NextJS, not for Gatsby 


**************************

  - next project -> we will up frontend to Netlify -> PROD Env -> will have different setup

      /api/*  https://user-workflow-11.herokuapp.com/api/:splat  200
      /* /index.html 200

  - the above code is from /public/_redirects -> everytime request sends to /api/* -> redirect to next next link -> this is how to setup in netlify


*/

import React, { useState } from 'react'
// const rootUrl = 'http://localhost:5000'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    const user = { email, password }

    try {
      // const url = `${rootUrl}/api/v1/auth/login`
      const url = `/api/v1/auth/login`
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      setPassword('')
      setEmail('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTesting = async () => {
    // const url = `${rootUrl}/api/v1`
    const url = `/api/v1`
    await fetch(url)
  }
  const fetchLogout = async () => {
    // const url = `${rootUrl}/api/v1/auth/logout`
    const url = `/api/v1/auth/logout`
    await fetch(url)
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h4>login form</h4>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-input email-input'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-input password-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block submit-btn'>
          submit
        </button>
      </form>
      <div className='container'>
        <button className='btn testing-btn' onClick={fetchTesting}>
          Testing
        </button>
        <button className='btn logout-btn' onClick={fetchLogout}>
          Logout
        </button>
      </div>
    </>
  )
}

export default App
