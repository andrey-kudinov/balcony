export const modals = () => {
  const bindModal = (triggerSelector, modalSelector, closeSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector)

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault()
        }
  
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.querySelector(`${modalSelector} input`).focus()
        // document.body.classList.add('modal-open')
      })
    })

    close.addEventListener('click', (e) => {
      modal.style.display = 'none'
      document.body.style.overflow = ''
      // document.body.classList.remove('modal-open')
    })

    document.addEventListener('keydown', event => {
      if (event.key === "Escape") {
        modal.style.display = 'none'
        document.body.style.overflow = ''
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
        document.body.style.overflow = ''
        // document.body.classList.remove('modal-open')
      }
    })
  }

  const showModalByTime = (selector, time) => {
    setTimeout(() => {
      document.querySelector(selector).style.display = 'block'
      document.body.style.overflow = ''
    }, time)
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
  bindModal('.phone_link', '.popup', '.popup .popup_close')
  // showModalByTime('.popup', 3000)
}
