import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiOutlineLogout} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    console.log(props)

    history.replace('/login')
  }

  return (
    <div className="header-main-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="home-logo"
        />
      </Link>

      <div className="lg-container">
        <ul className="unorder-list">
          <Link to="/" className="link">
            <li className="list">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="list">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="home-logout-button"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
      </div>
      <div className="sm-container">
        <ul className="unorder-list">
          <Link to="/" className="link">
            <li className="list">
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="list">
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>
        </ul>
        <button
          type="button"
          className="home-sm-logout-button"
          onClick={onClickLogoutButton}
        >
          <HiOutlineLogout className="lout-icon" />
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
