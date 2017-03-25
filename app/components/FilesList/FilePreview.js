import React, { Component } from 'react'
import { connect } from 'react-redux'

import mjml2html from 'helpers/mjml'
import { readMJMLFile } from 'helpers/fs'

@connect(state => ({
  preview: state.preview,
}))
class FilePreview extends Component {

  componentDidUpdate (prevProps) {
    const { preview } = this.props
    if (preview && prevProps.preview !== preview) {
      if (preview.file) {
        if (preview.file.endsWith('.mjml')) {
          readMJMLFile(preview.file).then(this.setIframeContent)
        }
      } else if (preview.mjml) {
        mjml2html(preview.mjml).then(this.setIframeContent)
      }
    }
  }

  componentWillUnmount () {
    this._unmounted = true
  }

  setIframeContent = content => {
    window.requestAnimationFrame(() => {
      const doc = this._iframe.contentDocument
      const documentElement = doc.documentElement
      documentElement.innerHTML = content
    })
  }

  render () {

    const {
      preview,
      disablePointer,
    } = this.props

    return (
      <div className='FilesList--preview'>
        {!preview ? (
          null
        ) : (preview.mjml || preview.file.endsWith('.mjml')) && (
          <iframe
            src=''
            style={{
              overflow: 'hidden',
              pointerEvents: disablePointer ? 'none' : 'auto',
            }}
            ref={n => this._iframe = n}
          />
        )}
      </div>
    )
  }

}

export default FilePreview
