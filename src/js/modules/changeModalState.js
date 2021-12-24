import { checkNumInputs } from '/'

export const changeModalState = (state) => {
  const windowForms = document.querySelectorAll('.balcon_icons_img'),
    windowWidth = document.querySelectorAll('#width'),
    windowHeight = document.querySelectorAll('#height'),
    windowType = document.querySelectorAll('#view_type'),
    windowProfile = document.querySelectorAll('.checkbox')

    checkNumInputs('#width')
    checkNumInputs('#height')

    const bindActionToElements = (event, elements, property) => {
      elements.forEach((element, index) => {
        element.addEventListener(event, () => {
          switch(element.nodeName) {
            case 'SPAN' :
              state[property] = index
              break
            case 'INPUT' :
               element.getAttribute('type') === 'radio' 
                ? state[property] = index === 0 ? 'Холодное' : 'Тёплое'
                : state[property] = element.value
               break
            case 'SELECT' :
              state[property] = element.value
              break
          }
          console.log('state -', state)
        })
      })
    }

    bindActionToElements('click', windowForms, 'form')
    bindActionToElements('input', windowWidth, 'width')
    bindActionToElements('input', windowHeight, 'height')
    bindActionToElements('change', windowType, 'type')
    bindActionToElements('change', windowProfile, 'profile')
}