import { useState, useEffect } from 'react'
import AddWaiter from "./AddWaiter"
import { useSelector, useDispatch } from 'react-redux'
import {FaUserPlus} from 'react-icons/fa'
import { getAllDates,getDateById, reset } from '../features/date/dateSlice'
import { useNavigate } from 'react-router-dom'
const NewWaiter = () => {
  const [formData, setFormData] = useState({
    date: ''
  })
  const { date, role, hours, shift } = formData
  const { user } = useSelector((state) => state.auth)
  const { dates, isLoading, isError, message , datesList} = useSelector((state) => state.date)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if (!user) {
      dispatch(logout())
      dispatch(userReset())
      navigate('/login')
    }
    dispatch(getAllDates())
    if(date===''&&dates!==null){
      dispatch(reset())
    }    
    
  },[user, isError, date])
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(getAllDates())
    let dateData = []
    datesList.forEach(d => {
    if((new Date(d.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})===(new Date(date)).toLocaleDateString('en-US', {timeZone: 'UTC'})){
        dateData.push(d.id)
        dispatch(getDateById(+dateData[0]))
      }
    })
  }
  return (
    <>
      {!dates? (

        <>
          <div className="form-container">
            <section className='heading'>
            <h4>
                <FaUserPlus /> Register a New Date!
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
                      <button type="submit" className="btn btn-primary">Add Waiter</button>
                    </div>
                </form>
            </section>
          </div>
        </>
      ):(
        <AddWaiter/>
      )}
    </>
  )
}

export default NewWaiter