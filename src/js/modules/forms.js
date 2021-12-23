export const forms = () => {
  const forms = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    phoneInputs = document.querySelectorAll('input[name="user_phone"]')

  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/, '')
    })
  })

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    }

    const res = await fetch(url, options)

    return await res.text()
  }

  const clearInputs = () => {
    inputs.forEach(input => input.value = '')
  }

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()

      const statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      form.appendChild(statusMessage)

      const formData = new FormData(form)

      // try {
      //   const result = await postData('/', formData)
      //   // const result = await postData('assets/server.php', formData)
      //   console.log('result -', result)
      //   statusMessage.textContent = message.success
      // } catch {
      //   console.log(error)
      //   statusMessage.textContent = message.failure
      // }

      postData('/', formData)
        .then(result => {
          console.log('result -', result)
          statusMessage.textContent = message.success
        })
        .catch(error => {
          console.error(error)
          statusMessage.textContent = message.failure
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessage.remove()
          }, 10000)
        })

      // clearInputs()
      // setTimeout(() => {
      //   statusMessage.remove()
      // }, 5000)
    })
  })
}
