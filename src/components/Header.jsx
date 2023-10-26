import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div className="container-fluid">
            <div className='header-logo'>
              <Link className="navbar-brand" to='/'>Tips</Link>
            </div>
            <div className='header-container'>
              <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                  <Link className="nav-link active" to="#">Home
                      <span className="visually-hidden">(current)</span>
                  </Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="#"><FaSignInAlt/>Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="#"><FaUser/>Register</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="#">New Date</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="#">Update Date</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="#">Check Date</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="#"><FaSignOutAlt/>Logout</Link>
                  </li>
              </ul>
              </div>
            </div>
        </div>
      </nav>

    </>
  )
}

export default Header