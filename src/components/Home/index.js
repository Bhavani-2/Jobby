import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="title-des-button-container">
        <h1 className="home-title">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="home-des">
          Millions of people are searching for jobs, salary, information,
          company review. Find the job that fits your ability and potential
        </p>
        <Link to="/jobs">
          <button type="button" className="home-job-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
