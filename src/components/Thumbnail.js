import React, { Component } from 'react'
import crypto from 'crypto'
import path from 'path'

import 'styles/Thumbnail.scss'

import { thumbnailsFolder } from 'helpers/file-system'

class Thumbnail extends Component {

  // Creates a path that loads the image
  static getSrc = item => {
    const itemPath = path.join(thumbnailsFolder, `${item.get('id')}.png`)
    const imagePath = `${itemPath}?t=${crypto.createHash('sha256').update(item.get('mjml')).digest('base64')}`
    const windowsIsShit = imagePath.replace(/\\/g, '\\\\')
    return windowsIsShit
  }

  render () {
    const { item } = this.props
    const thumbnailLoading = item.get('thumbnailLoading')

    return (
      <div className='Thumbnail'>
        {thumbnailLoading && <span className='Loading ion-android-sync'></span>}
        {!thumbnailLoading && <div className='Preview' style={{ backgroundImage: `url(${Thumbnail.getSrc(item)})` }}></div>}
      </div>
    )
  }

}

export default Thumbnail
