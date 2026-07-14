import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    userInputEle: '',
    passwordEle: '',
    errorText: '',
    isErrorClicked: false,
  }

  onFailure = errorMsg => {
    this.setState({isErrorClicked: true, errorText: errorMsg})
  }

  onSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onsubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {userInputEle, passwordEle} = this.state
    const userDetails = {username: userInputEle, password: passwordEle}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({userInputEle: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordEle: event.target.value})
  }

  renderUserName = () => {
    const {userInputEle} = this.state
    return (
      <div className="input-container">
        <label htmlFor="user" className="label">
          USERNAME
        </label>
        <input
          id="user"
          type="text"
          className="input"
          placeholder="Username"
          onChange={this.onChangeUserName}
          value={userInputEle}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {passwordEle} = this.state
    return (
      <div className="input-container">
        <label htmlFor="pass" className="label">
          PASSWORD
        </label>
        <input
          id="pass"
          type="password"
          className="input"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={passwordEle}
        />
      </div>
    )
  }

  render() {
    const {isErrorClicked, errorText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Login-main-container">
        <div className="login-inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form className="form-container" onSubmit={this.onsubmitForm}>
            {this.renderUserName()}
            {this.renderPassword()}
            <button type="submit" className="login-button">
              LOGIN
            </button>
            {isErrorClicked && <p className="login-error-para">*{errorText}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
