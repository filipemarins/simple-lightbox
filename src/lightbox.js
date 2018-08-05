const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ESC = 27

export default class Lightbox {
  constructor (autorStart = false) {
    this.autorStart = autorStart
    if (autorStart) {
      this._addImagesAttr()
    }
    this._buildElements()
    this._handleKeyup = this._handleKeyup.bind(this)
    this._handleWrapperClick = this._handleWrapperClick.bind(this)
    this._handleImagesClick = this._handleImagesClick.bind(this)
    this._addImagesClickListener()
    this._addListeners()
  }

  closeLightbox () {
    this.wrapper.classList.remove('show')
  }

  showPrevious () {
    if (this.currentPhotoId > 0) {
      this.currentPhoto = this.items[this.currentPhotoId - 1]
      this._showLightbox()
    }
  }

  showNext () {
    if (this.currentPhotoId < (this.items.length - 1)) {
      this.currentPhoto = this.items[this.currentPhotoId + 1]
      this._showLightbox()
    }
  }

  getCurrentPhoto () {
    if (this.wrapper.querySelector('[data-lightbox-id]')) {
      this.currentPhoto = this.wrapper.querySelector('[data-lightbox-id]')
      this.currentPhotoId = parseInt(this.currentPhoto.getAttribute('data-lightbox-id'))
    }
  }

  _buildElements () {
    const arrowRight = this._createElementByAttr('span', 'data-lightbox-arrow', 'right')
    const arrowLeft = this._createElementByAttr('span', 'data-lightbox-arrow', 'left')
    const div = this._createElementByAttr('div', 'data-app-lightbox', 'app')
    div.appendChild(arrowLeft)
    div.appendChild(arrowRight)
    document.body.appendChild(div)
    this.wrapper = document.querySelector('[data-app-lightbox]')
    this.items = document.querySelectorAll('[data-lightbox]')
    this.currentPhoto = null
    this.clonedPhoto = null
  }

  _addImagesAttr () {
    const imgs = document.getElementsByTagName('img')
    const imgsArray = [...imgs]
    imgsArray.forEach(img => {
      img.setAttribute('data-lightbox', 'true')
    })
  }

  _createElementByAttr (tagName, attrName, attrValue) {
    const element = document.createElement(tagName)
    element.setAttribute(attrName, attrValue)
    return element
  }

  _addListeners () {
    this.wrapper.onclick = this._handleWrapperClick
    window.onkeyup = this._handleKeyup
  }

  _addImagesClickListener () {
    this.items.forEach((item, index) => {
      item.setAttribute('data-lightbox-id', index)
      item.onclick = this._handleImagesClick
    })
  }

  _showLightbox () {
    this.clonedPhoto = this.currentPhoto.cloneNode(true)
    this._renderPhoto()
    this._disableArrow()
  }

  _renderPhoto () {
    let photo = this.currentPhoto.cloneNode(true)
    let currentPhoto = this.wrapper.querySelector('[data-lightbox]')
    if (currentPhoto) {
      this.wrapper.removeChild(currentPhoto)
    }
    this.wrapper.appendChild(photo)
  }

  _disableArrow () {
    let photoId = this.currentPhoto.getAttribute('data-lightbox-id')
    let left = document.querySelector("[data-lightbox-arrow='left']")
    let right = document.querySelector("[data-lightbox-arrow='right']")
    if (photoId === (this.items.length - 1)) {
      right.classList.add('disable')
    } else {
      right.classList.remove('disable')
    }
    if (photoId === 0) {
      left.classList.add('disable')
    } else {
      left.classList.remove('disable')
    }
  }

  _handleKeyup (e) {
    this.getCurrentPhoto()
    if (e.keyCode === LEFT_ARROW) {
      this.showPrevious()
    } else if (e.keyCode === RIGHT_ARROW) {
      this.showNext()
    } else if (e.keyCode === ESC) {
      this.closeLightbox()
    }
  }

  _handleWrapperClick (e) {
    if (e.target.nodeName === 'SPAN') {
      this._changePhoto(e.target)
    } else {
      this.closeLightbox()
    }
  }

  _handleImagesClick (e) {
    this.currentPhoto = e.target
    this._showLightbox(e)
    this.wrapper.classList.add('show')
  }

  _changePhoto (element) {
    this.getCurrentPhoto()
    if (element) {
      let buttonClicked = element.getAttribute('data-lightbox-arrow')
      if (buttonClicked === 'left') {
        this.showPrevious()
      } else {
        this.showNext()
      }
    }
  }
}
