import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {details} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="jobItem-list">
        <div className="logo-rating-title-container">
          <img
            className="jobItem-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <hr className="jobCard-hr-line" />
        <h1 className="des-title">Description</h1>
        <p className="location-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
