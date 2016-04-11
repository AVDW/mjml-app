import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTemplate, deleteTemplate, doUpdateTemplate, saveTemplateWithId } from '../actions/templates'
import Button from './Button'
import Modal from './Modal'

@connect()
class TemplateOverlayActions extends Component {

  state = {
    editNameModal: false,
  }

  /**
   * Show the modal to edit a template name
   *
   * @returns {undefined}
   */
  showEditNameModal = () => {
    this.setState({ editNameModal: true })
    this.props.captureOverlay(true)
  }

  /**
   * Close the modal to edit the template name
   *
   * @returns {undefined}
   */
  hideEditNameModal = () => {
    this.setState({ editNameModal: false })
    this.props.captureOverlay(false)
  }

  /**
   * load the selected template
   *
   * @param {Object} template the selected template
   * @returns {undefined}
   */
  loadTemplate = template => () => {
    this.props.dispatch(loadTemplate(template))
  }

  /**
   * Deletes an unwanted template
   *
   * @param {Object} template the unwanted template
   * @returns {undefined}
   */
  deleteTemplate = template => () => {
    this.props.dispatch(deleteTemplate(template))
  }

  /**
   * Update the template's name
   *
   * @param {Object} e event tha triggered the action
   * @returns {undefined}
   */
  saveName = e => {
    e.preventDefault()
    const { item } = this.props
    const newTemplateName = this.refs.tplName.value
    const id = item.get('id')
    this.props.dispatch(doUpdateTemplate({
      id,
      updater: t => t.set('name', newTemplateName),
    }))
    this.props.dispatch(saveTemplateWithId(id))
    this.hideEditNameModal()
  }

  render () {
    const { editNameModal } = this.state
    const { item } = this.props

    return (
      <div className='Overlay-actions'>
        <Button className='primary' onClick={this.showEditNameModal}>
          <i className='ion-pricetag' />
        </Button>

        <Button className='primary big' onClick={this.loadTemplate(item)}>
          <i className='ion-edit' />
        </Button>

        <Button className='danger' onClick={this.deleteTemplate(item)}>
          <i className='ion-trash-b' />
        </Button>

        <Modal isOpened={editNameModal} onClose={this.hideEditNameModal}>
          <form onSubmit={this.saveName}>
            <div className='form-group'>
              <input ref='tplName' type='text' defaultValue={item.get('name')} />
            </div>
            <div className='form-group'>
              <button type='submit' className='Button primary'>
                {'Save'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }

}

export default TemplateOverlayActions
