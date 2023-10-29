import { FaRegEdit } from 'react-icons/fa'

const UpdateDate = () => {
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
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
              <label className="btn btn-outline-primary" htmlFor="btnradio1">Update Date</label>
              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" defaultChecked />
              <label className="btn btn-outline-primary" htmlFor="btnradio2">Update Waiter</label>
            </div>
          </div>
        </section>
        </div>
    </>
  )
}

export default UpdateDate