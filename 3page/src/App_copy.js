
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Main from './routers/Main.js';
import NavBar from './routers/NavBar.js';
import Join from './routers/Join.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	
	let house = '제8전투비행단 - 청나래 아파트 101동';
	
  return (
    <div className="App_copy">
	 <div className= "black-nav">
		<h4>{ house }</h4>	  
	 </div>
	 	  
	</div>
  );
}

export default App;
