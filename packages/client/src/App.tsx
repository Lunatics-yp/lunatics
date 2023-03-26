import {useEffect} from 'react'
import './styles/App.scss'

function App() {
	useEffect(() => {
		const FetchServerData = async () => {
			const url = `http://localhost:${__SERVER_PORT__}`
			const response = await fetch(url)
			const data = await response.json()
			console.log(data)
		}

		FetchServerData()
	}, [])
	return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default App
