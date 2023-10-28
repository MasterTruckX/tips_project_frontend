import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { getDateById, getAllDates, reset } from '../features/date/dateSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import DateObj from '../components/DateObj'

const CheckDate = () => {
  const [formData, setFormData] = useState({
      date: ''
  })
  const { date } = formData
  const { dates, isLoading, isError, message , datesList} = useSelector((state) => state.date)
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
      dispatch(getAllDates())
      dispatch(reset())    
      
    },[user, isError,message, dispatch])
    
  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
    }
  let dateData = []
  // datesList.forEach(d => {if(d.date==date){
  //   dateData.push(d.id)
  // }})
  // console.log(dateData)
  // for(let i = 0; i<=datesList.length; i++){
    //   if(datesList[i].date===date){
      //     dateData.push(datesList[i].id)
      //   }
      // }
  const onSubmit = (e) => {
    e.preventDefault()
    datesList.forEach(d => {
      if((new Date(d.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})===(new Date(date)).toLocaleDateString('en-US', {timeZone: 'UTC'})){
        dateData.push(d.id)
      }
    })
    dispatch(getDateById(+dateData[0]))
      // if (datesList===[]) {
      //   toast.error('Select a date.')
      // } else {
          
      // }
  }
  return (
    <>
      <div className="form-container">
        {/* <Calendar/> */}
        <section className='heading'>
          <h4>
              <FaRegCalendarAlt /> Check your Dates!
          </h4>
          <p>Select the date you want to check.</p>
        </section>
        {(!dates)? (
            <>
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
                          <button type="submit" className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </section>
            </>
        ) : (
            <>
                <section>
                    <h3>Date: {(new Date(date)).toLocaleDateString('en-US', {timeZone: 'UTC'})}</h3>
                </section>
                <DateObj currentDate={dates}/>
            </>
        )}
      </div>
    </>
  )
}

export default CheckDate