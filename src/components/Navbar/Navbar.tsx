import React, { Dispatch, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { MdDarkMode } from 'react-icons/md'
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import { Container } from './styles'

import './Navbar.css'

interface Props {
    toggleTheme: (checked: boolean, event: MouseEvent | SyntheticEvent<MouseEvent | KeyboardEvent, Event>, id: string) => void
    token: { value: string }
    setToken: Dispatch<React.SetStateAction<Object>>
}

const Navbar: React.FC<Props> = (props) => {
	const { colors, title } = useContext(ThemeContext)

	const [logoutButton, setLogoutButton] = useState(false)

	const navigate = useNavigate()

	const handleLogout = () => {
		props.setToken({'value': 'none'})
	}
	useEffect(() => {
		props.token.value != 'none' ? setLogoutButton(true) : setLogoutButton(false)
		if(props.token.value == 'none'){
			navigate('/login')
		}
	}, [logoutButton, props.token.value])

	return (
		<Container>
			<h1>DBD SWF Finder</h1>
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
				<MdDarkMode style={{marginRight: '10px', height: '30px'}}/>
				<Switch
					checked={title === 'dark'} 
					onChange={props.toggleTheme} 
					onColor={colors.secondary} 
					offColor={colors.secondary}
					uncheckedIcon={false}
					checkedIcon={false}
					handleDiameter={25}
					height={10}
					width={40}
					className="react-switch"
              
				/>
				{logoutButton ? <Button style={{backgroundColor: colors.secondary, marginLeft: '10px', marginRight: '20px'}} onClick={handleLogout}>Logout</Button> : ''}
			</div>
          
		</Container>
	)
}

export default Navbar