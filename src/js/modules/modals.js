export const modals = () => {
  const bindModal = (args) => {
    const { triggerSelector, modalSelector, closeSelector, closeClickOverlay = true } = args

    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      popups =document.querySelectorAll('[data-modal]')

    const closePopups = () => {
      popups.forEach(popup => {
        popup.style.display = 'none'
      })
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault()
        }

        closePopups()
  
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
      if (e.target === modal && closeClickOverlay) {
        closePopups()

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

  const engineer = {
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close'
  },
    phone = {
      triggerSelector: '.phone_link',
      modalSelector: '.popup',
      closeSelector: '.popup .popup_close'
    },
    calc = {
      triggerSelector: '.popup_calc_btn',
      modalSelector: '.popup_calc',
      closeSelector: '.popup_calc_close'
    },
    profile = {
      triggerSelector: '.popup_calc_button',
      modalSelector: '.popup_calc_profile',
      closeSelector: '.popup_calc_profile_close',
      closeClickOverlay: false
    },
    end = {
      triggerSelector: '.popup_calc_profile_button',
      modalSelector: '.popup_calc_end',
      closeSelector: '.popup_calc_end_close',
      closeClickOverlay: false
    }

  bindModal(engineer)
  bindModal(phone)
  bindModal(calc)
  bindModal(profile)
  bindModal(end)
  // showModalByTime('.popup', 3000)
}
