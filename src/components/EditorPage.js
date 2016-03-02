import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Editor from './Editor'
import { makeSnapshot, updateCurrentTemplate, saveTemplate, exportTemplate } from '../actions/templates'
import { updateConfig } from '../actions'
import { send } from '../actions/send'
import aceThemes from '../assets/aceThemes'
import Button from './Button'

import '../styles/EditorPage.scss'

@connect(
  state => ({
    template: state.templates.getIn(['list', state.templates.get('list').findIndex(
      template => template.get('id') === state.templates.get('current')
    )]),
    config: state.config
  })
)
class EditorPage extends Component {

  constructor (props) {
    super(props)

    this._template = props.template
  }

  componentDidMount () { this.renderIframe() }
  componentDidUpdate () { this.renderIframe() }

  componentWillUnmount () {
    if (this.props.template.get('html') === this._template.get('html')) { return }
    this.props.dispatch(makeSnapshot(this.props.template))
  }

  handleChange = (mjml) => {
    this.props.dispatch(updateCurrentTemplate(template => template.set('mjml', mjml)))
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
    const html = template.get('html')
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

  save = () => {
    const { template } = this.props
    if (!template) { return }
    this.props.dispatch(exportTemplate(template))
  }

  send = () => {
    this.props.dispatch(send(this.props.template.get('html')))
  }

  home = () => {
    this.props.dispatch(push('/browse/recent'))
  }

  toggleMode = (platform) => () => {
    this.props.dispatch(updateConfig(config => config.set('previewMode', platform)))
  }

  render () {
    const { template, config } = this.props

    if (!template) { return this.renderEmpty() }

    const mjml = template.get('mjml')

    const editorTheme = config.get('editorTheme')
    const editorShowPreview = config.get('editorShowPreview')
    const previewMode = config.get('previewMode')
    console.log(previewMode)

    return (
      <div className='EditorPage anim-page'>
        <div className='EditorPage-bar'>

          <Button onClick={this.home} className='EditorPage-bar-item'>
            <i className='ion-android-arrow-back' />
          </Button>

          <Button onClick={this.save} className='EditorPage-bar-item'>
            <i className='ion-code-download' />
            {'Export'}
          </Button>

          <Button className='EditorPage-bar-item'>
            <i className='ion-gear-b' />
            {'Settings'}
          </Button>

          <select onChange={this.setTheme} value={editorTheme} className='select-theme'>
            {aceThemes.map(theme =>
              <option key={theme[0]} value={theme[0]}>
                {theme[1]}
              </option>)}
          </select>

          <div className='EditorPage-bar-side'>
            <Button className={cx('EditorPage-bar-item', { active: editorShowPreview })} onClick={this.togglePreview}>
              <i className='ion-android-image preview' />
              {'Preview'}
            </Button>
            <Button className='EditorPage-bar-item' onClick={this.send}>
              <i className='ion-ios-navigate preview' />
              {'Send'}
            </Button>
            <Button className='EditorPage-bar-item'>
              <i className='ion-social-github preview' />
              {'Gist'}
            </Button>
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
            <div className='platform'>
              <Button onClick={this.toggleMode('desktop')} className='platform-button'>
                <i className={cx('ion-android-desktop desktop', { active: previewMode === 'desktop' })}></i>
              </Button>
              <Button onClick={this.toggleMode('mobile')} className='platform-button'>
                <i className={cx('ion-iphone mobile', { active: previewMode === 'mobile' })}></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EditorPage
