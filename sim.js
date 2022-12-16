const sim = () => {
  let trialInput = document.querySelector('#trial-input')
  let probInput = document.querySelector('#prob-input')
  let capValue = parseInt(document.querySelector('#cap-input').value)

  let trialNumber = document.querySelector('#trial-number')
  let successNumber = document.querySelector('#success-number')

  let bars = document.querySelector('#bars')
  bars.innerHTML = ''

  document.querySelector('#expected-success').innerHTML = Math.round(trialInput.value * probInput.value / 100)

  let numSuccesses = 0
  successNumber.innerHTML = 0
  let results = new Array(capValue).fill(0)
  let current = 0

  for (let i = 1; i <= trialInput.value; i++) {
    current++
    let rand = Math.floor(Math.random() * (100 / probInput.value))

    if (rand === 0) {
      if (current <= capValue) {
        results[current - 1] += 1
      }
      current = 0
      successNumber.innerHTML = ++numSuccesses 
    }
  }

  trialNumber.innerHTML = trialInput.value

  for (let i = 0; i < capValue; i++) {
    let barWrapper = document.createElement('div')
    barWrapper.classList.add('bar-wrapper')

    let num = document.createElement('span')
    num.style.width = '2rem'
    num.innerHTML = (i + 1) + ':'

    let bar = document.createElement('div')
    bar.classList.add('bar')
    bar.style.width = (results[i] / numSuccesses * 100 * 0.8) + 'vw'

    let stat = document.createElement('span')
    stat.innerHTML = results[i] + ' runs (' + (results[i] / numSuccesses * 100).toFixed(2) + '%), ' + (results[i] * (i + 1)) + ' trials (' + (results[i] * (i + 1) / trialInput.value * 100).toFixed(2) + '%)'

    barWrapper.appendChild(num)
    barWrapper.appendChild(bar)
    barWrapper.appendChild(stat)
    bars.appendChild(barWrapper)
  }
}