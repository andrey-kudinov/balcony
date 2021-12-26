export const timer = (selector: string, deadline: string) => {
  const addZero = (num: number) => num < 10 ? '0' + num : String(num)

  const getTimeRemaining = (endtime: string) => {
    const total = Date.parse(endtime) - Date.parse(String(new Date())),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      days = Math.floor(total / (1000 * 60 * 60 * 24))
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const setClock = (selector: string, endtime: string) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds')

    const updateClock = () => {
      const timeRemaining = getTimeRemaining(endtime)

      days.textContent = addZero(timeRemaining.days)
      hours.textContent = addZero(timeRemaining.hours)
      minutes.textContent = addZero(timeRemaining.minutes)
      seconds.textContent = addZero(timeRemaining.seconds)

      if (timeRemaining.total <= 0) {
        days.textContent = '00'
        hours.textContent = '00'
        minutes.textContent = '00'
        seconds.textContent = '00'

        clearInterval(timeInterval)
      }
    };

    updateClock()

    const timeInterval = setInterval(updateClock, 1000)
  };

  setClock(selector, deadline)
};
