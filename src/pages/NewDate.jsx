// import Calendar from 'react-calendar'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {FaRegCalendarPlus} from 'react-icons/fa'
import { createDate, reset } from '../features/date/dateSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


const NewDate = () => {
  const [formData, setFormData] = useState({
    date: '',
    role: '',
    hours: '',
    shift: ''
  })
  const { date, role, hours, shift } = formData
  const {dates, isLoading, isError, isSuccess, message} = useSelector((state)=> state.date)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(reset())    
    
  },[user, isError,message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if( (date==='') || (role==='') || (hours==='') || (shift==='') ){
        toast.error('Enter the corresponding info in the empty fields.')
      }else{
        const dateData = {
          date, role, hours, shift
        }
        dispatch(createDate(dateData)) 
        setFormData(
          {
            date: '',
            role: '',
            hours: '',
            shift: ''
          }
        )
        navigate('/newWaiter')
      }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="form-container">
        {/* <Calendar/> */}
        <section className='heading'>
          <h4>
              <FaRegCalendarPlus /> Register a New Date!
          </h4>
          <p>Please fill the following fields.</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input
                        type="date"
                        className='form-control'
                        id='date'
                        name='date'
                        value={date}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role: </label>
                    <select
                      className='form-control'
                      id='role'
                      name='role'
                      value={role}
                      onChange={onChange}
                    >
                        <option value=''>Choose your role.</option>
                        <option value="Busser">Busser</option>
                        <option value="Food Runner">Food Runner</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="hours">Hours: </label>
                    <input
                        type="number"
                        className='form-control'
                        id='hours'
                        name='hours'
                        value={hours}
                        placeholder='0.00'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="shift">Shift: </label>
                    <select
                      className='form-control'
                      id='shift'
                      name='shift'
                      value={shift}
                      onChange={onChange}
                    >
                        <option value=''>Choose your shift.</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
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

export default NewDate