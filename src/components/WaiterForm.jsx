import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const WaiterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    checkTip: '',
    paidTip: '',
    id: ''
  })

  const { name, checkTip, paidTip, id } = formData
  
  return (
    <>
    </>
  )
}

export default WaiterForm