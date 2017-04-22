import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconUnchecked from 'react-icons/md/check-box-outline-blank'
import IconChecked from 'react-icons/md/check-box'

import './style.scss'

class CheckBox extends Component {

  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleKeyDown = e => {
    if (e.which === 13 || e.which === 32) {
      this.props.onChange(!this.props.value)
    }
  }

  render () {

    const {
      value,
      onChange,
      children,
    } = this.props

    return (
      <div
        tabIndex={0}
        className='Checkbox d-f ai-c c-d t-small focus'
        onKeyDown={this.handleKeyDown}
        onClick={() => onChange(!value)}
      >
        <div className='mr-5 z'>
          {value ? (
            <IconChecked size={15} />
          ) : (
            <IconUnchecked size={15} />
          )}
        </div>
        {children}
      </div>
    )
  }

}

export default CheckBox
