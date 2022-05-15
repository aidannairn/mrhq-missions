let themeWrapper = ''
let bodyHTML = ''
// let theme = ''

const changeTheme = (theme) => {
  themeWrapper = document.getElementById('theme')
  console.log(theme)
  themeWrapper.className = theme
  bodyHTML = document.getElementById('body').innerHTML
  localStorage.userTheme = bodyHTML
}

const checkEdits = () => {
  if(localStorage.userTheme != null)
  document.getElementById('body').innerHTML = localStorage.userTheme
}

// console.log(document)