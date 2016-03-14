<h3 align="center">
	Mjml app
</h3>

<p align="center">
  <a href="https://travis-ci.org/mjmlio/mjml-app"><img src="http://img.shields.io/travis/mjmlio/mjml-app/master.svg?style=flat-square" alt="Build Status"></a>
  <a href="http://starveller.sigsev.io/mjmlio/mjml-app"><img src="http://starveller.sigsev.io/api/repos/mjmlio/mjml-app/badge" alt="Week Stars"></a>
</p>

<br />

<p align="center">
  <img src="screenshot.png">
</p>

<br />

<p align="center">
	The first MJML Email Editor
</p>

<br />

This is a local editor for the [MJML](https://github.com/mjmlio/mjml) language.
It allows you to create responsive emails with a live preview on both phone and Desktop.

The app is based on React, Redux and Electron.

### Installation

Visit the [website](http://mjmlio.github.io/mjml-app/) to download the version that fits your platform.

### Build from source

OSX

``` bash
$ git clone <repo> mjml-app && cd mjml-app
$ npm install && npm run package
```

Binary will be created in the `releases` folder.

### Releases and Changelogs

#### 1.0.0
 - Templates manager on the Home Page
 - Mobile/Desktop preview
 - Live reloading
 - Auto save
 - Theme manager
 - Test email
 - Export as Gist
