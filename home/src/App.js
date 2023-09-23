 
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Main from './routers/Main.js';
import {NavBar }from './routers/NavBar.js';
import Join from './routers/Join.js';
import Boq from './routers/Boq.js';
import {BoqDetailed} from './routers/BoqDetailed.js';
import {Subscrption} from './routers/Subscrption.js';

function App() {
  return (
    <>
	  <NavBar></NavBar>
      <Routes>
		  <Route path='/' element={<Main></Main> } />
		  <Route path='/join' element={<Join></Join> } />
      <Route path='/boq' element={<Boq></Boq> } />
      <Route path='/boq/:id' element={<BoqDetailed></BoqDetailed> } />
      <Route path='/subscrption' element={<Subscrption></Subscrption>}></Route>
	  </Routes>	  
    </>
  );
}

export default App;
