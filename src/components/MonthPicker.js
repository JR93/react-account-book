import React from 'react'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }
  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return
    }
    this.setState({
      isOpen: false
    })
  }
  toggleDropdown = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  selectYear = (yearNumber) => {
    console.log(yearNumber)
    this.setState({
      selectedYear: yearNumber
    })
  }
  selectMonth = (monthNumber) => {
    this.setState({
      isOpen: false
    })
    this.props.onChange(this.state.selectedYear, monthNumber)
  }
  render() {
    const { year, month } = this.props
    const { isOpen, selectedYear } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(number => number + year)
    return (
      <div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
        <h4>选择月份</h4>
        <button
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        { isOpen &&
          <div className="dropdown-menu" style={{display: 'block'}}>
            <div className="row">
              <div className="col border-right">
                { yearRange.map((yearNumber, index) =>
                  <div
                    key={index}
                    onClick={() => {this.selectYear(yearNumber)}}
                    className={(yearNumber === selectedYear) ? 'dropdown-item active' : 'dropdown-item'}
                  >
                    {yearNumber} 年
                  </div>
                )}
              </div>
              <div className="col">
                { monthRange.map((monthNumber, index) =>
                  <div
                    key={index}
                    onClick={() => {this.selectMonth(monthNumber)}}
                    className={(monthNumber === month) ? 'dropdown-item active' : 'dropdown-item'}
                  >
                    {padLeft(monthNumber)} 月
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

MonthPicker.propsTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MonthPicker