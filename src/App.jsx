import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import CheckDate from './pages/CheckDate'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NewDate from './pages/NewDate'
import NewWaiter from './pages/NewWaiter'
import Register from './pages/Register'
import UpdateDate from './pages/UpdateDate'

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
            <Route path='/newWaiter' element= {<NewWaiter/>}/>
            <Route path='/checkDate' element= {<CheckDate/>}/>
            <Route path='/updateDate' element= {<UpdateDate/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App