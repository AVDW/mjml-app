import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import mjml2html from 'mjml/lib/mjml2html'

import Editor from './Editor'
import { updateTemplate, saveTemplate } from '../actions/template'
import { updateConfig } from '../actions'
import aceThemes from '../assets/aceThemes'

import '../styles/EditorPage.scss'

@connect(
  state => ({
    template: state.template,
    config: state.config
  })
)
class EditorPage extends Component {

  componentDidMount () { this.renderIframe() }
  componentDidUpdate () { this.renderIframe() }

  handleChange = (mjml) => {
    this.props.dispatch(updateTemplate(template => template.set('mjml', mjml)))
    this.props.dispatch(saveTemplate())
  }

  togglePreview = () => {
    this.props.dispatch(updateConfig(config => config.set('editorShowPreview', !this.props.config.get('editorShowPreview'))))
  }

  setTheme = e => {
    const theme = e.target.value
    this.props.dispatch(updateConfig(config => config.set('editorTheme', theme)))
  }

  renderIframe () {
    const { template } = this.props
    if (!template) { return }
    let html
    try {
      html = mjml2html(template.get('mjml'))
    } catch (e) {
      html = this._oldHtml || ''
    }
    if (html === this._oldHtml) { return }
    const doc = this._iframe.contentDocument
    const documentElement = doc.documentElement
    documentElement.innerHTML = html
    this._oldHtml = html
  }

  renderEmpty () {
    return (
      <div>
        {'No template selected. You should not be here.'}
      </div>
    )
  }

  render () {
    const { template, config } = this.props

    if (!template) { return this.renderEmpty() }

    const mjml = template.get('mjml')

    const editorTheme = config.get('editorTheme')
    const editorShowPreview = config.get('editorShowPreview')

    return (
      <div className='EditorPage'>
        <div className='EditorPage-bar'>

          <select onChange={this.setTheme} value={editorTheme}>
            {aceThemes.map(theme =>
              <option key={theme[0]} value={theme[0]}>
                {theme[1]}
              </option>)}
          </select>

          <div className='EditorPage-bar-side'>
            <label>
              <input type='checkbox' checked={editorShowPreview} onChange={this.togglePreview} />
              {' Preview'}
            </label>
          </div>
        </div>
        <div className='EditorPage-view'>
          <div className='EditorPage-panel'>
            <Editor
              value={mjml}
              theme={editorTheme}
              onChange={this.handleChange} />
          </div>
          <div className={cx('EditorPage-preview', { show: editorShowPreview })}>
            <iframe id='preview' ref={(el) => this._iframe = el} />
          </div>
        </div>
      </div>
    )
  }

}

export default EditorPage
