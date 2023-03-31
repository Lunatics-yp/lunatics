import 'client/src/styles/app.scss';
import {Background} from 'client/src/components/Background';
import {MainMenu} from 'client/src/pages/MainMenu';

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

	return (<div className='app'>
		<Background/>
		<MainMenu/>

	</div>);
}

export default App;
