
import './App.css';
import Home from './Home';
import Login from './Login'
import Register from './Register';
import Admin from './Admin';
import Report from './Report';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
function App() {

  return (
    
      
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Login}/>
      <Route path='/home' Component={Home}/>
      <Route path='/register' Component={Register}/>
      <Route path='/admin' Component={Admin}/>
      <Route path='/report' Component={Report}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
