// import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';

export function render() {
	return renderToString(
		<div>SSR</div>,
	);
}
