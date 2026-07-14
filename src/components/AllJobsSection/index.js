import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import UserProfile from '../UserProfile'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllJobsSection extends Component {
  state = {
    searchInput: 'Dev',
    employeeType: [],
    salryRange: '',
    jobData: [],
    apiStatus: apiConstStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiConstStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employeeType, salryRange} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${salryRange}&search=${searchInput}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(data)

      this.setState({jobData: formatedData, apiStatus: apiConstStatus.success})
    } else {
      this.setState({apiStatus: apiConstStatus.failure})
    }
  }

  onChnageSearch = event => {
    this.setState({searchInput: event.target.value}, this.getData)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onKeyDownSearch = event => {
    this.setState({searchInput: event.target.value}, this.getData)
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          className="input"
          type="search"
          placeholder="Search"
          onChange={this.onChnageSearch}
          onKeyDown={this.onKeyDownSearch}
          value={searchInput}
        />
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
        >
          <AiOutlineSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onChangeEmployeType = value => {
    const {employeeType} = this.state
    let updatedList = employeeType
    if (employeeType.includes(value)) {
      updatedList = employeeType.filter(eachType => eachType !== value)
    } else {
      updatedList = [...updatedList, value]
    }

    this.setState({employeeType: updatedList}, this.getData)
  }

  onChangeSalary = value => {
    this.setState({salryRange: value}, this.getData)
  }

  onClickRetry = () => {
    this.setState(
      {
        employeeType: [],
        salryRange: '',
        jobData: [],
        apiStatus: apiConstStatus.initial,
      },
      this.getData,
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobcard-failure-img"
      />
      <h1 className="no-job-heading">Oops! Something Went Wrong</h1>
      <p className="no-job-para">
        We cannot seem to find the page you are looking for
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
    const {jobData} = this.state

    return (
      <>
        {jobData.length > 0 ? (
          <ul className="jobItem-unorder-list">
            {jobData.map(each => (
              <JobCard details={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div className="no-job-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
              alt="no jobs"
              className="no-job-img"
            />
            <h1 className="no-job-heading">No Jobs Found</h1>
            <p className="no-job-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderList = () => {
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
    return (
      <div className="jobs-Main-container">
        <div className="filterd-search-JobItem-section">
          <div className="search-sm-container">
            {this.renderSearchContainer()}
          </div>
          <div className="filterd-section">
            <UserProfile />
            <FilterGroup
              employeList={employmentTypesList}
              salaryList={salaryRangesList}
              onChangeEmployeType={this.onChangeEmployeType}
              onChangeSalary={this.onChangeSalary}
            />
          </div>
          <div className="search-jobItem-section">
            <div className="search-lg-container">
              {this.renderSearchContainer()}
            </div>

            {this.renderList()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobsSection
