const fs = require('fs')
const path = require('path')
const app = require('electron').app
const screenshot = require('electron-screenshot-service')

const Mailjet = require('node-mailjet');
//  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

exports.takeSnapshot = function (id, html, done) {
  const url = `data:text/html,${encodeURIComponent(html)}`

  screenshot({
    url,
    width: 650,
    height: 800,
    css: 'body{overflow:hidden}'
  }).then(img => {
    const p = path.join(app.getAppPath(), `./thumbnails/${id}.png`)
    fs.writeFile(p, img.data, done)
  })
  .catch(done)
}

exports.send = function (options, success, error) {
  new Mailjet(options.apiKey, options.apiSecret)
    .post('send')
    .request({
      FromName: options.name,
      FromEmail: options.sender,
      To: options.to,
      Subject: 'Test Email',
      'Html-Part': options.html
    }, function (err, response, body) {
      if (err || response.statusCode !== 200) error();
      else success();
    })
}
