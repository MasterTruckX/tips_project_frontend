import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="light">
        <div className="container-fluid">
            <div className='header-logo'>
              <p className="navbar-brand">Tips</p>
            </div>
            <div className='header-container'>
              <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav me-auto">
                {user? (
                <>
                  <li className="nav-item">
                  <Link className="nav-link active" to={"#"}>Home</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/newDate"}>New Date</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/newWaiter"}>New Waiter</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/updateDate"}>Update Date</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/checkDate"}>Check Date</Link>
                  </li>
                  <li className="nav-item">
                    <button className='nav-link' onClick={onLogout}>
                      <FaSignOutAlt />Logout
                    </button>
                  </li>
                </>
                ) : (
                <>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/login"}><FaSignInAlt/>Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/register"}><FaUser/>Register</Link>
                  </li>
                </>
                )}
              </ul>
              </div>
            </div>
        </div>
      </nav>

    </>
  )
}

export default Header