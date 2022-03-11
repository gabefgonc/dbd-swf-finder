import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

import APIClient from '../../services/api'

import Button from '../../components/Button'

import redirect from '../../utils/redirect'

import { Container, Code, CodeLink, Title, SubTitle, GroupContainer } from './styles'
import Paragraph from '../../components/Paragraph'

interface Props {
	token: { value: string }
}

interface ApiData{
    _id: string
    description: string,
    members: {username: string, discord: string, steamProfileUrl: string}[]
}

const Component: React.FC<Props> = (props) => {

	const navigate = useNavigate()
	const params = useParams()
	const [apiData, setApiData] = useState<ApiData>({_id: '', description: '', members: []})
	const [message, setMessage] = useState('')

	useEffect(() => {
		if(props.token.value == 'none') navigate('/login')
	}, [props.token])

	const getApiData = async  (isMounted: boolean) => {
		APIClient.get(`/group/${params.id}`, { headers: { 'authorization': `Bearer ${props.token.value}`}}).then((res) => {
			if(isMounted){
				setApiData(res.data.group)
			}
            
		}).catch((err) => {
			if(axios.isAxiosError(err)){
				if(err.response){
					setMessage(err.response.data.message)
				}else{
					setMessage('Error: couldn\'t get available groups')
				}
			}
			console.log(err)
		})
	}

	useEffect(() => {
		let isMounted = true

		getApiData(isMounted)

		setInterval(() => getApiData(isMounted), 7000)

		return () => { isMounted = false }
	}, [])

	const leaveGroup = () => {
		APIClient.get(`/group/${params.id}/leave`, { headers: { 'authorization': `Bearer ${props.token.value}`}}).then(() => {
			navigate('/')
		}).catch((err) => {
			if(axios.isAxiosError(err)){
				if(err.response){
					setMessage(err.response.data.message)
				}else{
					setMessage('Error: couldn\'t get available groups')
				}
			}
			console.log(err)
		})
	}

	return (
		<Container>
			<GroupContainer>
				{message}
				<Paragraph>{apiData.description}</Paragraph>
				<Title>Members</Title>
				{apiData.members.map(item => {
					return <React.Fragment key={'username ' + item.username}>
						<SubTitle key={item.username}>{item.username}</SubTitle>
						<Code key={item.discord}>{item.discord}</Code>
						<Code key={item.steamProfileUrl}><CodeLink onClick={() => redirect(item.steamProfileUrl)}>Steam Profile</CodeLink></Code>
					</React.Fragment>
				})}
				<Button onClick={leaveGroup}>Leave</Button>
			</GroupContainer>
		</Container>
	)
}

export default Component