import axios from 'axios'

const APIClient = axios.create({
	baseURL: 'https://dbd-swf-finder.herokuapp.com/',
	headers: {
		'Accept': 'application/json',
	}
})

export default APIClient