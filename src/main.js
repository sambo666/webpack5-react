import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'

import './assets/main.css'

//import example2 from './assets/img/card-4.png'
import example3 from './assets/img/20330215461637755667.svg'

document.addEventListener('DOMContentLoaded', function() {
	const rootElem = document.getElementById('root');
	const root = ReactDOM.createRoot(rootElem);
	root.render(<App />)
})