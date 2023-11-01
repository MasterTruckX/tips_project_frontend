const WaiterSelector = ({waiter}) => {
  return (
    <option value={(waiter.name).toString()}>{waiter.name}</option>
  )
}

export default WaiterSelector