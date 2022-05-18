let themeWrapper = ''
let bodyHTML = ''
// let theme = ''

const changeTheme = (theme) => {
  themeWrapper = document.getElementById('theme')
  themeWrapper.className = theme
  localStorage.setItem('userTheme', theme)
}

const checkTheme = () => {
  if (localStorage.userTheme != null) {
  themeWrapper = document.getElementById('theme')
  let theme = localStorage.getItem('userTheme')
  themeWrapper.className = theme
  } 
}

const themes = [
  {
    name: 'default',
    colorPrimary: '#212529',
    colorSecondary: '#495057',
    colorTertiary: '#ced4da',
    bgPrimary: '#dee2e6',
    bgSecondary: '#f8f9fa'
  },
  {
    name: 'dark',
    colorPrimary: '#f8f9fa',
    colorSecondary: '#dee2e6',
    colorTertiary: '#ced4da',
    bgPrimary: '#495057',
    bgSecondary: '#212529'
  },
  {
    name: 'candyfloss',
    colorPrimary: '#fb6f92',
    colorSecondary: '#ff8fab',
    colorTertiary: '#ffb3c6',
    bgPrimary: '#ffc2d1',
    bgSecondary: '#ffe5ec'
  },
]

const addThemeSelector = () => {
  let theme = {}
  let themeId = ''
  let appendAfter = document.getElementById('theme-heading')
  let color = {}
  
  for (let i = 0; i < themes.length; i++) {
    
    themeId = i

    theme = document.createElement('div')
    theme.setAttribute('id', `theme-${i}`)
    theme.classList.add('theme')
    theme.setAttribute('value', themes[i].name)
    theme.addEventListener('click', (e) => changeTheme(themes[i].name))

    theme.innerHTML = `
      <h6 class="palette-heading">${themes[i].name}</h6>
      <div id="palette-${i}" class="colors"></div>
    `

    appendAfter.appendChild(theme)

    let colorArray = [
      themes[i].colorPrimary,
      themes[i].colorSecondary,
      themes[i].colorTertiary,
      themes[i].bgPrimary,
      themes[i].bgSecondary,
    ]

    for (let i = 0; i <= 4; i++) {
      color = document.createElement('div')
      color.classList.add('color')

      document.getElementById(`palette-${themeId}`).appendChild(color).style.backgroundColor = colorArray[i]
    }
  }
}