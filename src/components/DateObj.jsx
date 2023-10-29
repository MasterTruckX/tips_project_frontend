import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllWaiters, reset as resetWaiters } from '../features/waiters/waitersSlice'
import WaiterObj from './WaiterObj'

const DateObj = ({currentDate}) => {
  const {dates} = useSelector((state) => state.date)
  const {waiters} = useSelector((state) => state.waiter)
  const dispatch = useDispatch()
  useEffect(() => {
    if(dates){
      dispatch(getAllWaiters(+dates.id))
    }
  },[dates])  
  return (
  <>
      <h3>Date: {(new Date(currentDate.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})}</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Role</th>
            <th scope="col">Hours</th>
            <th scope="col">Shift</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-dark">
            <th scope="row">{(new Date(currentDate.date)).toLocaleDateString('en-US', {timeZone: 'UTC'})}</th>
            <td>{currentDate.role}</td>
            <td>{currentDate.hours}</td>
            <td>{currentDate.shift}</td>
          </tr>
        </tbody>
      </table>
      <section className="content">
        {waiters.length > 0 ? (
            <div className="tareas">
                {waiters.map((currentWaiter) => (
                    <WaiterObj key={currentWaiter.id} waiter={currentWaiter} />
                ))}
            </div>
        ) : (
            <h3>No waiters registered.</h3>
        )}
      </section>
  </>
  )
}

export default DateObj