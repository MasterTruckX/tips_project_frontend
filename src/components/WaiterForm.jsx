import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {FaUserPlus} from 'react-icons/fa'
import { createWaiter, reset } from '../features/waiters/waitersSlice'
import Spinner from '../components/Spinner'

const WaiterForm = (dateId) => {
  const actualDateId = dateId
  const [formData, setFormData] = useState({
    name: '',
    checkTip: '',
    paidTip: '',
    id: ''
  })

  const { name, checkTip, paidTip, id } = formData
  const { waiters, isLoading, isError, isSuccess, message} = useSelector((state) => state.waiter)
  const dispatch = useDispatch()
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    dispatch(reset())    
    
  },[isError,message, dispatch])
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const waiterData = {
        name, checkTip, paidTip, id: actualDateId
    }
    dispatch(createWaiter(waiterData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className='form-container'>

        <section className='heading'>
        <h4>
            <FaUserPlus/> Enter the waiter information
        </h4>
        <p>Please fill the following fields.</p>
        </section>
        <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input 
                type="text"
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter the name of the waiter'
                onChange= {onChange}
            />
            </div>
            <div className="form-group">
            <input 
                type="number"
                className='form-control'
                id='checkTip'
                name='checkTip'
                value={checkTip}
                placeholder='Enter the tip from the check'
                onChange= {onChange}
            />
            </div>
            <div className="form-group">
            <input 
                type="number"
                className='form-control'
                id='paidTip'
                name='paidTip'
                value={paidTip}
                placeholder='Enter the tip you got paid'
                onChange= {onChange}
            />
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Waiter</button>
            </div>
        </form>
        </section>
      </div>
    </>
  )
}

export default WaiterForm