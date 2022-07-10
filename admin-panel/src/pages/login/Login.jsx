import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {login} from '../../redux/apiCalls'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        login(dispatch, { username, password });
    }

    return (
        <div>
            <input type="text" placeholder='login' onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login