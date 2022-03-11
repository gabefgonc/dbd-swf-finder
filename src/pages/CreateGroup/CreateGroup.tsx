import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../../components/Button'
import Form from '../../components/Form'
import APIClient from '../../services/api'
import { SubTitle, TextArea } from './styles'

interface Props{
    token: {value: string}
}

const CreateGroup: React.FC<Props> = ({ token }) => {

	const [description, setDescription] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	const handleSubmit = () => {
		APIClient.post('createGroup', { description }, { headers: { 'authorization': `Bearer ${token.value}` } }).then((res) => {
			navigate(`/group/${res.data.group._id}`)
		}).catch((err) => {
			if(axios.isAxiosError(err)){

				if(err.response){
					setMessage(err.response.data.message)
				}else{
					setMessage('Error: couldn\'t join group')
				}
			}
		})
	}

	return (
		<div>
			<p>{message}</p>
			<Form>
				<SubTitle>Group Description</SubTitle>
				<TextArea onChange={(e) => setDescription(e.target.value)} value={description}/>
				<Button onClick={handleSubmit}>Create</Button>
			</Form>
		</div>
	)
}

export default CreateGroup