import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: ''
  })
  const { name, username, password, password2 } = formData

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/login')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

const onSubmit = (e) => {

    e.preventDefault()

    if (password !== password2) {
        toast.error('Passwords are different.')
    } else {
        const userData = {
            name, username, password
        }
        dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="form-container">
        <section className='heading'>
          <h4>
              <FaUser /> Register your account!
          </h4>
          <p>Please fill the following fields.</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className='form-control'
                        id='username'
                        name='username'
                        value={username}
                        placeholder='Enter your username'
                        onChange={onChange}
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
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm your password'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </section>
      </div>
    </>

  )
}

export default Register