export const tabs = (args) => {
  const {headerSelector, tabSelector, contentSelector, activeClass, display = 'block'} = args

  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    contents = document.querySelectorAll(contentSelector)

  const hideTabContent = () => {
    contents.forEach(content => {
      content.style.display = 'none'
    })

    tabs.forEach(tab => {
      tab.classList.remove(activeClass)
    })
  }

  const showTabContent = (i = 0) => {
    contents[i].style.display = display
    tabs[i].classList.add(activeClass)
  }

  hideTabContent()
  showTabContent()

  const handleAction = (event) => {
    const { target } = event
    
    if (
      target && (
        target.classList.contains(tabSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, ""))
      )
    ) {
      tabs.forEach((tab, index) => {
        if (target === tab || target.parentNode === tab) {
          hideTabContent()
          showTabContent(index)
        }
      })
    }
  }

  header.addEventListener('click', event => {
    handleAction(event)
  })

  header.addEventListener('keydown', event => {
    if (event.key === "Enter") {
      handleAction(event)
    }
  });
}