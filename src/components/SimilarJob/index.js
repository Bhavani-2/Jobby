import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJob = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = details

  return (
    <li className="similar-list-docs">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-url"
        />
        <div>
          <h1 className="company-logo-title">{title}</h1>
          <div className="rating-container">
            <FaStar className="jobItem-rating-icon" />
            <p className="jobItem-rating-para">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-desc-heading">Description</h1>
      <p className="similar-desc">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJob
