import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import Button from '../Button'


import APIClient from '../../services/api'

import redirect from '../../utils/redirect'
import { Container, Code, Title, SubTitle, CodeLink } from './styles'
import Paragraph from '../Paragraph'

interface Props{
    description: string
    members: { username: string, discord: string, steamProfileUrl: string }[]
	_id: string
	token: {value: string}

}

const GroupCard: React.FC<Props> = (props) => {

	const [message, setMessage] = useState('')

	const navigate = useNavigate()
  
	const joinGroup = () => {
		APIClient.get(`/group/${props._id}/join`, { headers: { 'authorization': `Bearer ${props.token.value}`}})
			.then(() => {
				navigate(`/group/${props._id}`)
			})
			.catch((err) => {
				if(axios.isAxiosError(err)){

					if(err.response){
						setMessage(err.response.data.message)
					}else{
						setMessage('Error: couldn\'t join group')
					}
				}
				console.log(err)
			})
	}

	return (
		<Container onClick={() => navigate(`/group/${props._id}`)}>
			<SubTitle>{message}</SubTitle>
			<Paragraph>{props.description}</Paragraph>
			<Title>Members</Title>
			{props.members.map(item => {
				return <React.Fragment key={'username ' + item.username}>
					<SubTitle key={item.username}>{item.username}</SubTitle>
					<Code key={item.discord}>{item.discord}</Code>
					<Code key={item.steamProfileUrl}><CodeLink onClick={() => redirect(item.steamProfileUrl)}>Steam Profile</CodeLink></Code>
				</React.Fragment>
			})}
			<Button onClick={joinGroup}>Join</Button>
		</Container>
	)
}

export default GroupCard