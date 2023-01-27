const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numbersCheckEl = document.querySelector("#number-check")
const symbolsCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16 //Aqui vai 16, pois é o valor default do input range

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz"

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numbersChars = "123456789"
  const symbolsChars = "?!@&*()[]"

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars
  }

  if (numbersCheckEl.checked) {
    chars += numbersChars
  }

  if (symbolsCheckEl.checked) {
    chars += symbolsChars
  }

  let password = ""

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }
  inputEl.value = password
  calculateQuality()
  calculateFontSize()
}

function calculateQuality() {
  //T.25 + M*0.15 + S*0.35 + N*0.15 = 100

  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numbersCheckEl.checked ? 25 : 0) +
      (symbolsCheckEl.checked ? 35 : 0)
  )
  securityIndicatorBarEl.style.width = `${percent}%`

  if (percent > 69) {
    // safe
    securityIndicatorBarEl.classList.remove("critical")
    securityIndicatorBarEl.classList.remove("warning")
    securityIndicatorBarEl.classList.add("safe")
  } else if (percent > 50) {
    //warning
    securityIndicatorBarEl.classList.remove("critical")
    securityIndicatorBarEl.classList.add("warning")
    securityIndicatorBarEl.classList.remove("safe")
  } else {
    //critical
    securityIndicatorBarEl.classList.add("critical")
    securityIndicatorBarEl.classList.remove("warning")
    securityIndicatorBarEl.classList.remove("safe")
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed")
  } else {
    securityIndicatorBarEl.classList.remove("completed")
  }
}

function calculateFontSize() {
  if (passwordLength > 45) {
    //blablalba
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.add("font-xxs")
  } else if (passwordLength > 32) {
    //blablabla
    inputEl.classList.remove("font-sm")
    inputEl.classList.add("font-xs")
    inputEl.classList.remove("font-xxs")
  } else if (passwordLength > 22) {
    //blablabla
    inputEl.classList.add("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
  } else {
    //blablabla
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
  }
}

function copy() {
  navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  document.querySelector("#password-length-text").innerText = passwordLength

  generatePassword() //Precisa chamar a função dentro do evento, para que ao arrastar o range, os valores mudem.
})
upperCaseCheckEl.addEventListener("click", generatePassword)
numbersCheckEl.addEventListener("click", generatePassword)
symbolsCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy1").addEventListener("click", copy)
document.querySelector("#copy2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)
generatePassword()
