import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { createWaiter, deleteWaiters, reset } from '../features/waiters/waitersSlice'
import { logout, reset as userReset } from '../features/auth/authSlice'
import WaiterSelector from './WaiterSelector'

const WaiterUpdate = ({currentDate}) => {
  const [formData, setFormData] = useState({
    name: '',
    checkTip: 0,
    paidTip: 0,
    id: ''
  })

  const { name , checkTip , paidTip} = formData
  const { user } = useSelector((state) => state.auth)
  const { dates} = useSelector((state) => state.date)
  const {waiters, isLoading, isError, message , datesList} = useSelector((state) => state.waiter)
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if (!user) {
      dispatch(logout())
      dispatch(userReset())
      navigate('/login')
    }
  },[dates, waiters, isError, user])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const waiterData = {
      name, checkTip, paidTip, id: currentDate.id
    }
    waiters.forEach(w => {
      if(w.name===name){
        dispatch(deleteWaiters(+w.id))
        dispatch(reset())
      }
    })
    dispatch(createWaiter(waiterData))
    dispatch(reset())
    setFormData({
      name:'',
      checkTip: 0,
      paidTip: ''
    })
  }

  const onSubmitDelete = (e) => {
    e.preventDefault()
    waiters.forEach(w => {
      if(w.name===name){
        dispatch(deleteWaiters(+w.id))
        dispatch(reset())
      }
    })
    // if(waiterList.length!==0){
    //   toast.warn(`Deleting waiter ${name}`)
    // }else {
    //   toast.error('There are no waiters registered.')
    // }
    setFormData(
      {
        name:''
      }
    )
  }

  return (
    <>
      {waiters.length > 0? (
        <>
          <form onSubmit={onSubmit}>
              <div className="form-grop">
                  <label htmlFor="name">Waiter: </label>
                  <select className='form-control' name='name' id='name' value={name} onChange={onChange}
                  >
                    <option value="">Choose a waiter.</option>
                    {waiters.map((currentWaiter) => (
                        <WaiterSelector key={currentWaiter.id} waiter={currentWaiter}/>
                    ))}
                  </select>
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
                <button type="submit" className="btn btn-primary">Update Waiter</button>
              </div>
          </form>
          <form className='btn-delete' onSubmit={onSubmitDelete}>
            <div className="form-group">
              <button type="submit" className='btn btn-outline-danger'>Delete Waiter</button>
            </div>
          </form>
        </>
      ):(
        <h3 className='text-secundary'>No waiters registered.</h3>
      )}
    </>
  )
}

export default WaiterUpdate