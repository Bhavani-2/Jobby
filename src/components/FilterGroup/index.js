import './index.css'

const FilterGroup = props => {
  const renderLocation = () => {
    const {onChangeLocation, locationList} = props
    return locationList.map(each => {
      const {label} = each
      const onChangeType = event => {
        onChangeLocation(event.target.value)
      }
      return (
        <li className="employeeList-container" key={each.locationId}>
          <div className="label-container">
            <input
              id={each.locationId}
              type="checkbox"
              className="filter-input"
              onChange={onChangeType}
              value={each.locationId}
              name={each.label}
            />
            <label htmlFor={each.locationId} className="label">
              {label}
            </label>
          </div>
        </li>
      )
    })
  }
  const renderEmployee = () => {
    const {employeList, onChangeEmployeType} = props

    return employeList.map(each => {
      const {label} = each
      const onChangeType = event => {
        onChangeEmployeType(event.target.value)
      }
      return (
        <li className="employeeList-container" key={each.employmentTypeId}>
          <div className="label-container">
            <input
              id={each.employmentTypeId}
              type="checkbox"
              className="filter-input"
              onChange={onChangeType}
              value={each.employmentTypeId}
              name={each.label}
            />
            <label htmlFor={each.employmentTypeId} className="label">
              {label}
            </label>
          </div>
        </li>
      )
    })
  }

  const renderSalary = () => {
    const {salaryList, onChangeSalary} = props

    return salaryList.map(each => {
      const {label, salaryRangeId} = each
      const onChnageRange = () => {
        onChangeSalary(salaryRangeId)
      }
      return (
        <li className="employeeList-container" key={each.salaryRangeId}>
          <div className="label-container">
            <input
              id={each.salaryRangeId}
              type="radio"
              className="filter-input"
              value={salaryRangeId}
              name="salary"
              onChange={onChnageRange}
            />
            <label htmlFor={each.salaryRangeId} className="label">
              {label}
            </label>
          </div>
        </li>
      )
    })
  }
  return (
    <>
      <hr className="hr-line" />
      <h1 className="filter-head">Type of Employment </h1>
      <ul className="unorder">{renderEmployee()}</ul>

      <hr className="hr-line" />
      <h1 className="filter-head">Salary Range </h1>
      <ul className="unorder">{renderSalary()}</ul>

      <hr className="hr-line" />
      <h1 className="filter-head">Location </h1>
      <ul className="unorder">{renderLocation()}</ul>
    </>
  )
}

export default FilterGroup
