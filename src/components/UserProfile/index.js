import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiConstStatus.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiConstStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      methood: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const formettedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formettedData,
        apiStatus: apiConstStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstStatus.failure})
    }
  }

  failureButton = () => {
    this.setState(
      {apiStatus: apiConstStatus.initial, profileDetails: {}},
      this.getProfile,
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.failureButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-title">{name}</h1>
        <p className="profile-des">{shortBio}</p>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstStatus.inProgress:
        return this.renderLoadingView()
      case apiConstStatus.failure:
        return this.renderFailureView()
      case apiConstStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderView()}</>
  }
}

export default UserProfile
