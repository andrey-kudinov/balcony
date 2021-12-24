import { checkNumInputs } from '/'

export const forms = (state) => {
  const forms = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input')

  checkNumInputs('input[name="user_phone"]')

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading

    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]) // ! console.log()
    }

    const options = {
      method: 'POST',
      body: data
    }

    const result = await fetch(url, options)

    return await result.text()
  }

  const clearInputs = () => {
    inputs.forEach(input => input.value = '')
  }

  forms.forEach(form => {
    form.addEventListener('submit', async event => {
      event.preventDefault()

      const statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      form.appendChild(statusMessage)

      const formData = new FormData(form)
      if (form.getAttribute('data-calc') === "end") {
        for (let key in state) {
          formData.append(key, state[key])
        }
      }

      try {
        const result = await postData('/', formData)
        // const result = await postData('assets/server.php', formData)
        console.log('result -', result)
        statusMessage.textContent = message.success
      } catch {
        console.log(error)
        statusMessage.textContent = message.failure
      }

      // postData('/', formData)
      //   .then(result => {
      //     console.log('result -', result)
      //     statusMessage.textContent = message.success
      //   })
      //   .catch(error => {
      //     console.error(error)
      //     statusMessage.textContent = message.failure
      //   })
      //   .finally(() => {
      //     clearInputs()
      //     setTimeout(() => {
      //       statusMessage.remove()
      //     }, 10000)
      //   })

      clearInputs()
      setTimeout(() => {
        statusMessage.remove()
      }, 10000)
    })
  })
}
