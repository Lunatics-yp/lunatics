// import {useEffect} from 'react'
import './styles/app.scss';
import {Background} from "./components/Background";
import {PageExample} from "./pages/Example";

function App() {
	// useEffect(() => {
	// 	const FetchServerData = async () => {
	// 		const url = `http://localhost:${__SERVER_PORT__}`
	// 		const response = await fetch(url)
	// 		const data = await response.json()
	// 		console.log(data)
	// 	}
	//
	// 	FetchServerData()
	// }, [])

	return (<div className="app">
		<PageExample/>
		<Background/>
	</div>);
}

export default App;
