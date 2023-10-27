import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NewDate from './pages/NewDate'
import Register from './pages/Register'

function App() {  

  return (
    <>
      <Router>
        <Header/>
        <div>
          <Routes>
            <Route path='/' element= {<Dashboard/>}/>
            <Route path='/login' element= {<Login/>}/>
            <Route path='/register' element= {<Register/>}/>
            <Route path='/newDate' element= {<NewDate/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App