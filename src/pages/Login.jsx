import { useState, useEffect } from 'react'
import { FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password} = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  },[ user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      username, password
    }
    dispatch(login(userData))   
  }
  
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <div className='form-container'>

        <section className='heading'>
          <h4>
            <FaSignInAlt/> Enter your account information
          </h4>
          <p>Please fill the following fields.</p>
        </section>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input 
                type="text"
                className='form-control'
                id='username'
                name='username'
                value={username}
                placeholder='Enter your username'
                onChange= {onChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="password"
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange= {onChange}
              />
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </section>
      </div>
    </>  )
}

export default Login