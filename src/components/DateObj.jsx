const DateObj = ({currentDate}) => {
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

    </>
  )
}

export default DateObj