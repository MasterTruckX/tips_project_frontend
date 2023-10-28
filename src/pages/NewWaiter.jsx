import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {FaUserPlus} from 'react-icons/fa'
import { createWaiter, reset } from '../features/waiters/waitersSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const NewWaiter = () => {
    const [formData, setFormData] = useState({
      name: '',
      checkTip: '',
      paidTip: '',
      id: ''
    })
  
    const { name, checkTip, paidTip, id } = formData
    const { waiters, isLoading, isError, isSuccess, message} = useSelector((state) => state.waiter)
    const { user } = useSelector((state) => state.auth)
    const { dates } = useSelector((state) => state.date)
    // const dates = {id: 15}
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
      
    },[user,navigate,isSuccess,isError,message, dispatch])
    const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
    }
    const onSubmit = (e) => {
      e.preventDefault()
      if( (name==='') || (checkTip==='') || (paidTip==='') || (dates.id==='') ){
        toast.error('Enter the corresponding info in the empty fields.')
      }else {
          const waiterData = {
              name, checkTip, paidTip, id: dates.id
          }
          dispatch(createWaiter(waiterData))
          setFormData(
            {
              name: '',
              checkTip: '',
              paidTip: ''
            }
          )
          navigate('/newWaiter')
      }
    }
    const exit =  (e) => {
        e.preventDefault()
        dispatch(reset())
        navigate('/newDate')
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
            <label htmlFor="name">Waiter's name:</label>
            <select
             type="text"
             className='form-control'
             id='name'
             name='name'
             value={name}
             onChange= {onChange}
            >
                <option value=''>Choose the waiter.</option>
                <option value="Alejandro">Alejandro</option>
                <option value="Antonella">Antonella</option>
                <option value="Aria">Aria</option>
                <option value="Ayla">Ayla</option>
                <option value="Azzurra">Azzurra</option>
                <option value="Brandon">Brandon</option>
                <option value="David">David</option>
                <option value="Francesca">Francesca</option>
                <option value="Gabriele">Gabriele</option>
                <option value="Giordano">Giordano</option>
                <option value="Kerem">Kerem</option>
                <option value="Luca">Luca</option>
                <option value="Manuel">Manuel</option>
                <option value="Marcello">Marcello</option>
                <option value="Natalie">Natalie</option>
                <option value="Nicole">Nicole</option>
                <option value="Tatiana">Tatiana</option>
            </select>
            </div>
            <div className="form-group">
            <label htmlFor="checkTip">Tip from check:</label>
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
            <label htmlFor="paidTip">Tip paid:</label>
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
            <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={exit} style={{marginTop: '50px'}}>All waiters registered</button>
            </div>
        </form>
        </section>
      </div>
    </>
  )
}

export default NewWaiter