import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaRegEdit } from 'react-icons/fa'
import {createDate, getDateById,getAllDates, deleteDate, reset } from '../features/date/dateSlice'
import { logout, reset as userReset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const UpdateDate = () => {
  const [formData, setFormData] = useState({
    date: '',
    role: '',
    hours: 0,
    shift: '',
    btnradio: 'date'
  })
  const { date,role, hours, shift, btnradio } = formData
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
    // dispatch(reset())
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
  const onSubmitDate = (e) => {
    e.preventDefault()
    let dateData = []
    datesList.forEach(d => {
    if((new Date(d.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})===(new Date(date)).toLocaleDateString('en-US', {timeZone: 'UTC'})){
        dateData.push(d.id)
        dispatch(getDateById(+dateData[0]))
      }
    })
    if(dateData.length===0 || date === ''){
      toast.error('Choose a registered Date.')
    }
  }
  const onSubmitForm = (e) => {
    e.preventDefault()
    if( (date==='') || (role==='') || (hours==='') || (shift==='') ){
      toast.error('Enter the corresponding info in the empty fields.')
    }else{
      const dateData = {
        date,role, hours, shift
      }
      dispatch(createDate(dateData))
      dispatch(deleteDate(dates.id))
      setFormData(
        {
          date: '',
          role: '',
          hours: '',
          shift: ''
        }
      )
      toast.warn(`${(new Date(dateData.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})} has ben updated.`)
      dispatch(reset())
    }
  }

  const onSubmitDelete = (e) => {
    e.preventDefault()
    let dateData = []
    datesList.forEach(d => {
    if((new Date(d.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})===(new Date(date)).toLocaleDateString('en-US', {timeZone: 'UTC'})){
        dateData.push(d.id)
        dispatch(deleteDate(+dateData[0]))
      }
    })
    setFormData(
      {
        date: ''
      }
    )
    toast.warn('deleting')
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className="form-container">
        <section className='heading'>
          <h4>
              <FaRegEdit /> Update your Dates!
          </h4>
          <p>Please fill the following fields.</p>
        </section>
        <section>
          <div>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value={'date'} onChange={onChange} autoComplete="off" defaultChecked />
              <label className="btn btn-outline-primary" htmlFor="btnradio1">Update Date</label>
              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value={'waiter'} onChange={onChange} autoComplete="off"/>
              <label className="btn btn-outline-primary" htmlFor="btnradio2">Update Waiter</label>
            </div>
          </div>
        </section>
        <section className='form-dates'>
            <form onSubmit={onSubmitDate}>
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
                  <button type="submit" className='btn btn-primary'>Check</button>
                </div>
            </form>
            {date!==''? (
              <>
                <form className='btn-delete' onSubmit={onSubmitDelete}>
                  <div className="form-group">
                    <button type="submit" className='btn btn-outline-danger'>Delete Date</button>
                  </div>
                </form>
              </>
            ) : (
              <>
              </>
            )}
        </section>
        <section>
          {dates&&date!==''? (
            <>
              {btnradio==='date'? (
                <>
                  <h1>Update date</h1>
                  <form onSubmit={onSubmitForm}>
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
                </>
              ) : (
                <h1>Update waiterrrrrrrrrr</h1>
              )}
            </>
          ) : (
            <>
              <h3 className='text-secondary'>Select a date and click on Check</h3>
            </>
          )}
        </section>
      </div>
    </>
  )
}

export default UpdateDate