export const images = () => {
  const imagePopup = document.createElement('div'),
    workSection = document.querySelector('.works'),
    bigImage = document.createElement('img')

  imagePopup.classList.add('popup')

  workSection.appendChild(imagePopup)

  imagePopup.style.justifyContent = 'center'
  imagePopup.style.alignItems = 'center'
  imagePopup.style.display = 'none'

  imagePopup.appendChild(bigImage)

  workSection.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault()

    const target = event.target as HTMLElement

    if (target && target.classList.contains('preview')) {
      imagePopup.style.display = 'flex'
      const parentNode = target.parentNode as HTMLElement,
        path = parentNode.getAttribute('href')
      bigImage.setAttribute('src', path)
    }

    if (target && target.matches('div.popup')) {
      imagePopup.style.display = 'none'
    }
  })
}