import React, { Dispatch, useState, useRef, useEffect, useContext } from 'react'

import axios, { AxiosError } from 'axios'
import { ThemeContext } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/Form'
import Input from '../../components/Input'

import Button from '../../components/Button'

import APIClient from '../../services/api'


interface Token{
	value: string
}

interface Props {
    setToken: Dispatch<React.SetStateAction<Token>>
}

const Login: React.FC<Props> = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const { colors } = useContext(ThemeContext)
	const isMounted = useRef(false)
	
	useEffect(() => {
		isMounted.current = true
		
		return () => {isMounted.current = false}
	})

	const navigate = useNavigate()
    
	const handleSubmit = () => {
		if(username == '' || password == ''){
			setMessage('You should enter your username and password')
		}
		APIClient.post('auth/login', { username, password }).then((res) => {
			if(isMounted.current){
				setMessage('Success, now you can access the site')
				props.setToken({value: res.data.token})
				navigate('/')
			}
		}).catch((err: Error | AxiosError ) => {
			if(axios.isAxiosError(err)){

				if(err.response){
					setMessage(err.response.data.message)
				}else{
					setMessage('Error: check your credentials')
				}
			}
		})
	}

	return (
		<Form>
			<h1>Login</h1>
			<p>{message}</p>
			<Input placeholder="Enter username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
			<Input style={{ marginTop: '20px' }}placeholder="Enter password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
			<Button onClick={handleSubmit}>Submit</Button>
			<p>Don't have an account? <Link to='/register' style={{color: colors.text}}>Register</Link></p>
		</Form>

	)
}

export default Login