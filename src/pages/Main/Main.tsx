import { useNavigate } from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GroupCard from '../../components/GroupCard'
import APIClient from '../../services/api'
import Button from '../../components/Button'
import { Container } from './styles'

interface Props{
    token: {value: string}
}

interface Group{
    _id: string
    description: string,
    members: {username: string, discord: string, steamProfileUrl: string}[]
}

const Main: React.FC<Props> = (props) => {

	const navigate = useNavigate()
	const [groups, setGroups] = useState([])
	const [message, setMessage] = useState('')

	useEffect(() => {
		if(props.token.value == 'none') navigate('/login')
	}, [props.token])

	const getApiData = async  (isMounted: boolean) => {
		APIClient.get('groups', { headers: { 'authorization': `Bearer ${props.token.value}`}}).then((res) => {
			if(isMounted){
				setGroups(res.data.result)
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
	return(
		<Container>
			<p>{message}</p>
			<Button onClick={() => navigate('/createGroup')}>New Group</Button>
			{
				groups.map((group: Group) => {
					return (
						<GroupCard
							_id={group._id}
							key={group._id}
							description={group.description}
							members={group.members}
							token={props.token}
						/>
					)
				})
			}
		</Container>
	)
}


export default Main