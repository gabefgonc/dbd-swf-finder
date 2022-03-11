import { useState, useEffect } from 'react'

export default function usePersistentState(key: string, initialState: any){
	const [state, setState] = useState(() => {
		const storage = localStorage.getItem(key)

		if(storage){
			return JSON.parse(storage)
		} 
		else return initialState
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state).replace(/(?:\\[rn])+/g, ''))
	}, [state, key])

	return [state, setState]
}