interface IArgs {
  triggerSelector: string
  modalSelector: string
  closeSelector: string
  closeClickOverlay?: boolean
}

export const modals = () => {
  const bindModal = (args: IArgs) => {
    const { triggerSelector, modalSelector, closeSelector, closeClickOverlay = true } = args

    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector<HTMLElement>(modalSelector),
      close = document.querySelector(closeSelector),
      popups =document.querySelectorAll<HTMLElement>('[data-modal]')

    const closePopups = () => {
      popups.forEach(popup => {
        popup.style.display = 'none'
      })
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (event: any) => {
        if (event.target) {
          event.preventDefault()
        }

        closePopups()
  
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        if (document.querySelector(`${modalSelector} input:not([type='radio'])`)) {
          document.querySelector<HTMLElement>(`${modalSelector} input:not([type='radio'])`).focus()
        }
        // document.body.classList.add('modal-open')
      })
    })

    close.addEventListener('click', (event: any) => {
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

    modal.addEventListener('click', (event: any) => {
      if (event.target === modal && closeClickOverlay) {
        closePopups()

        modal.style.display = 'none'
        document.body.style.overflow = ''
        // document.body.classList.remove('modal-open')
      }
    })
  }

  const showModalByTime = (selector: any, time: any) => {
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
