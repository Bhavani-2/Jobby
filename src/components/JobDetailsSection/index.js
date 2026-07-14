import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import SimilarJob from '../SimilarJob'

import './index.css'

const apiConstStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailsSection extends Component {
  state = {
    jobDetails: {},
    skillData: [],
    similarJobData: [],
    apiStatus: apiConstStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      methood: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        companyWebsiteUrl: data.job_details.company_website_url,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        imageUrl: data.job_details.life_at_company.image_url,
        lifeAtCompany: data.job_details.life_at_company,
        description: data.job_details.life_at_company.description,
        similarJobs: data.job_details.similar_jobs,
      }
      const formatedSimilarJob = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const formatedSkillData = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({
        jobDetails: formatedData,
        skillData: formatedSkillData,
        similarJobData: formatedSimilarJob,
        apiStatus: apiConstStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstStatus.failure})
    }
  }

  onClickRetry = () => {
    this.setState(
      {
        jobDetails: {},
        skillData: [],
        similarJobData: [],
        apiStatus: apiConstStatus.initial,
      },
      this.getJobDetails,
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobcard-failure-img"
      />
      <h1 className="no-job-heading">Oops! Something Went Wrong</h1>
      <p className="no-job-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.onClickRetry}
        type="button"
        className="jobcard-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, skillData, similarJobData} = this.state
    console.log(jobDetails)

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,

      imageUrl,
      companyWebsiteUrl,
      description,
    } = jobDetails
    return (
      <>
        <ul className="job-details-card-container">
          <div className="logo-rating-title-container">
            <img
              className="jobItem-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="rating-title-container">
              <h1 className="jobItem-heading">{title}</h1>
              <div className="rating-container">
                <FaStar className="jobItem-rating-icon" />
                <p className="jobItem-rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-para">{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="location-icon" />
                <p className="location-para">{employmentType}</p>
              </div>
            </div>
            <p className="location-para">{packagePerAnnum}</p>
          </div>
          <hr className="jobDetails-hr-line" />
          <div className="visit-des-container">
            <h1 className="des-title">Description</h1>
            <a href={companyWebsiteUrl} className="anchor">
              Visit <FaExternalLinkAlt />
            </a>
          </div>

          <p className="location-para">{jobDescription}</p>
          <div className="skill-container">
            <h1 className="jobItem-heading">Skills</h1>
            <ul className="skill-unorder-list">
              {skillData.map(each => (
                <li className="skill-list" key={each.name}>
                  <img
                    className="skill-img"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <h3 className="skill-head">{each.name}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-container">
            <h1 className="jobItem-heading">Life at company</h1>
            <div className="life-des-img-container">
              <p className="life-des-para">{description}</p>
              <img src={imageUrl} alt="life at company" className="life-img" />
            </div>
          </div>
        </ul>
        <div className="similar-card-container">
          <h1 className="jobItem-heading">Similar Jobs</h1>
          <ul className="similar-unorder">
            {similarJobData.map(each => (
              <SimilarJob details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
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
    return <div className="JobDetails-container">{this.renderView()}</div>
  }
}

export default JobDetailsSection
