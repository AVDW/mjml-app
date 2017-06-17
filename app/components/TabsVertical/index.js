import React, {
  PureComponent,
  Children,
} from 'react'
import cx from 'classnames'

import './style.scss'

class TabsVertical extends PureComponent {

  state = {
    index: 0,
  }

  handleSetTab = index => this.setState({ index })

  render () {

    const {
      children,
    } = this.props

    const {
      index,
    } = this.state

    const childs = Children.toArray(children)
    const tabToDisplay = childs[index]
    const titles = childs.map(ch => ch.props.title)

    return (
      <div className='TabsVertical sticky'>
        <div className='TabsVertical--Tabs'>
          {titles.map((title, i) => (
            <div
              key={title}
              className={cx('TabsVertical--Tab', {
                isActive: i === index,
              })}
              onClick={() => this.handleSetTab(i)}
            >
              {title}
            </div>
          ))}
        </div>
        <div className='TabsVertical--View'>
          {tabToDisplay}
        </div>
      </div>
    )
  }

}

export class TabItem extends PureComponent {

  render () {

    const {
      children,
      className,
    } = this.props

    return (
      <div className={className}>
        {children}
      </div>
    )
  }

}

export default TabsVertical
