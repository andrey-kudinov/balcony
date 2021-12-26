export const checkNumInputs = (selector: string) => {
  const numInputs = document.querySelectorAll(selector)

  numInputs.forEach((numInput: HTMLInputElement) => {
    numInput.addEventListener('input', () => {
      numInput.value = numInput.value.replace(/\D/, '')
    })
  })
}