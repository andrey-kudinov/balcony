import './slider';
import { modals, tabs, forms, changeModalState, timer, images } from './modules';

window.addEventListener('DOMContentLoaded', () => {
  const modalState = {},
    deadline = '2022/01/01',
    glazing = {
      headerSelector: '.glazing_slider',
      tabSelector: '.glazing_block',
      contentSelector: '.glazing_content',
      activeClass: 'active'
    },
    decoration = {
      headerSelector: '.decoration_slider',
      tabSelector: '.no_click',
      contentSelector: '.decoration_content > div > div',
      activeClass: 'after_click'
    },
    balcony = {
      headerSelector: '.balcon_icons',
      tabSelector: '.balcon_icons_img',
      contentSelector: '.big_img > img',
      activeClass: 'do_image_more',
      display: 'inline-block'
    }

  changeModalState(modalState)
  modals()
  tabs(glazing)
  tabs(decoration)
  tabs(balcony)
  forms(modalState)
  timer('.timer1', deadline)
  images()
})
