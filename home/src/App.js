
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Main from './routers/Main.js';
import NavBar from './routers/NavBar.js';
import Join from './routers/Join.js';

function App() {
  return (
    <>
	  <NavBar></NavBar>
      <Routes>
		  <Route path='/' element={<Main></Main> } />
		  <Route path='/join' element={<Join></Join> } />
	  </Routes>	  
    </>
  );
}

export default App;
