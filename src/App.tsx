import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import React from 'react'
import Navbar from './components/Navbar'
import light from './styles/themes/light'
import dark from './styles/themes/dark'
import Main from './pages/Main/'
import usePersistentState from './utils/usePersistentState'
import GlobalStyle from './styles/global'
import Login from './pages/Login'
import Register from './pages/Register'
import GroupInfo from './pages/GroupInfo'
import CreateGroup from './pages/CreateGroup'



function App() {
	const [theme, setTheme] = usePersistentState('theme', light)
	const [token, setToken] = usePersistentState('token', {'value': 'none'})

	const toggleTheme = () => {
		setTheme(theme.title === 'light' ? dark : light)
	}
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle/>
			<BrowserRouter>
				<Navbar setToken={setToken} token={token} toggleTheme={toggleTheme}/>
				<Routes>
					<Route path="/" element={<Main token={token}/>}/>
					<Route path="/login" element={token.value != 'none' ? <p>Already logged in</p> : <Login setToken={setToken}/> }/>
					<Route path="/register" element={token.value != 'none' ? <p>Already logged in</p> : <Register/> }/>
					<Route path="/createGroup" element={<CreateGroup token={token}/>}/>
					<Route path="/group/:id" element={<GroupInfo token={token}/>}/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
