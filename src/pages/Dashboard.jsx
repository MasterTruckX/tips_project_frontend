import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state => state.auth))
    const {isLoading, isError, message} = useSelector((state)=> state.date)

    useEffect(() => {

        if (isError) {
            console.log(error)
        }

        if (!user) {
            navigate('/login')
        }

    }, [user, navigate, isError, message, dispatch])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard