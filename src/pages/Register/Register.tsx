import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'

import APIClient from '../../services/api'

import Button from '../../components/Button'
import Form from '../../components/Form'
import Input from '../../components/Input'

const Register: React.FC = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [discord, setDiscord] = useState('')
	const [steamProfileUrl, setSteamProfileUrl] = useState('')
	const [message, setMessage] = useState('')
	const isMounted = useRef(false)
	
	useEffect(() => {
		isMounted.current = true
		
		return () => {isMounted.current = false}
	})

	const navigate = useNavigate()
    
	const handleSubmit = async () => {
		APIClient.post('auth/register', { username, email, password, confirmPassword, discord, steamProfileUrl }).then((res) => {
			if(res.status != 200) return
			setMessage(res.data.message)
			navigate('/login')
		}).catch((err: Error | AxiosError ) => {
			if(axios.isAxiosError(err)){

				if(err.response){
					setMessage(err.response.data.message)
				}else{
					setMessage('Error: check the data you entered')
				}
			}
			console.log(err)
		})
	}

	return <Form>
		<h1>Register</h1>
		<p>{message}</p>
		<p>Username</p>
		<Input placeholder="Enter username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
		<p>E-mail</p>
		<Input placeholder="Enter e-mail" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
		<p>Password</p>
		<Input placeholder="Enter password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
		<p>Confirm Password</p>
		<Input placeholder="Confirm your password" type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
		<p>Steam Profile Url (<a rel="noreferrer" href="https://pastebin.com/QucYcV8w" target="_blank">Tutorial</a>)</p>
		<Input placeholder="Enter your Steam Profile Url" type="url" value={steamProfileUrl} onChange={(e) => {setSteamProfileUrl(e.target.value)}}/>
		<p>Discord username and tag</p>
		<Input placeholder="Enter your Discord username and tag" type="text" value={discord} onChange={(e) => {setDiscord(e.target.value)}}/>
		<Button onClick={handleSubmit}>Submit</Button>
	</Form>
}

export default Register