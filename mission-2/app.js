// Function is given the theme name as a parameter. If the theme name exists in an object in the themes.js file it will set the theme colors accordingly. It will also save the theme name to local storage so that the theme persists after page refresh.

const addTheme = (theme) => {
  const themeWrapper = document.getElementById('theme-wrapper')
  let themeName = theme.name
  themeWrapper.style.backgroundColor = theme.bgPrimary
  themeWrapper.style.borderColor = theme.bgSecondary
  themeWrapper.style.color = theme.colorPrimary

  const selectThemeBy = (type, selectors) => {
    let selectorArray = []
    const selectorTypes = {
      applyThemeToClassNames: function(selector){
        selectorArray = document.getElementsByClassName(selector)
      },
      applyThemeToTagNames: function(selector){
        selectorArray = document.getElementsByTagName(selector)
      },
      applyThemeToIds: function(selector){
        const element = document.getElementById(selector)
        selectorArray.push(element)
      },
      applyThemeToPseudoClasses: function(selectorWithPseudo){
        let parentSelector = selectorWithPseudo.split(' ')[0]
        let pseudoClass = selectorWithPseudo.split(' ')[1]

        parentSelector = document.querySelector(parentSelector)
        selectorArray = parentSelector.querySelectorAll(pseudoClass)
      }
    }
    for (let selectorIndex = 0; selectorIndex < selectors.length; selectorIndex++) {
      const selector = selectors[selectorIndex];
      for (const key in selectorTypes) {
        if (key === type) {
          selectorTypes[key](selector)
        }
      }
    }
    return selectorArray
  }

  const selectorThemeStyles = [
    {
      selectorType: 'applyThemeToClassNames',
      selectors: ['bg-secondary'],
      css: {
        backgroundColor: theme.bgSecondary
      }
    },
    {
      selectorType: 'applyThemeToTagNames',
      selectors: ['a'],
      css: {
        color: theme.colorPrimary
      }
    },
    {
      selectorType: 'applyThemeToIds',
      selectors: ['navbar'],
      css: {
        backgroundColor: theme.bgSecondary
      }
    },
    {
      selectorType: 'applyThemeToPseudoClasses',
      selectors: ['#theme-selection-container .theme:nth-of-type(2n)'],
      css: {
        backgroundColor: theme.bgSecondary
      }
    }
  ]

  for (let i = 0; i < selectorThemeStyles.length; i++) {
    const stylesItem = selectorThemeStyles[i]
    let customCss = stylesItem.css
    let stylesItemArray = []
    const { selectorType, selectors } = stylesItem

    stylesItemArray = selectThemeBy(selectorType, selectors)

    for (let i = 0; i < stylesItemArray.length; i++) {
      const index = i
      for (const key in customCss) {
        stylesItemArray[index].style[key] = customCss[key]
      }
    }
  }
  localStorage.setItem('userTheme', themeName)
  return themeWrapper
}

const applyTheme = (themeName) => {
  const savedCustomColors = localStorage.getItem('customColors')
  savedThemeColors = JSON.parse(savedCustomColors)

  const colorArray = [
    savedThemeColors.colorPrimary,
    savedThemeColors.colorSecondary,
    savedThemeColors.colorTertiary,
    savedThemeColors.bgSecondary,
    savedThemeColors.bgPrimary,
  ]

  for (let i = 0; i <= 4; i++) {
    document.getElementById(`custom-col-${i}`).style.backgroundColor = colorArray[i]
  }
  
  if (themeName === 'custom') {
    addTheme(savedThemeColors)
  } else {
    for (let i = 0; i < themes.length; i++) {
      const theme = themes[i]
      if (theme.name === themeName) {
        addTheme(theme)
      }
    }
  }
}

// When the body element loads/reloads this function will check to see whether a theme has been saved to localStorage. If it has - apply that theme by retrieving the theme name and using it as a parameter for the applyTheme function. If not - set the theme name to 'default' and call the applyTheme function.

const checkTheme = () => {
  let themeName
  let customColors = {}

  if (localStorage.customColors != null) {
    let savedCustomColors
    savedCustomColors = localStorage.getItem('customColors')
    customColors = JSON.parse(savedCustomColors)
    themeName = customColors.name
  } else {
    customColors = {
      name: 'custom',
      colorPrimary: '#212529',
      colorSecondary: '#495057',
      colorTertiary: '#ced4da',
      bgSecondary: '#dee2e6',
      bgPrimary: '#f8f9fa'
    }
    localStorage.setItem('customColors', JSON.stringify(customColors))
    themeName = customColors.name
  }

  if (localStorage.userTheme != null) {
    themeName = localStorage.getItem('userTheme')
  } else {
    themeName = 'default'
  }
  addCustomThemeSelector(customColors)
  applyTheme(themeName)
}

// This function dynamically renders theme selection boxes within the Theme Selection Container div. Each theme selection box is given a unique id, a class of 'theme', a color palette, and includes an event listener so that when a theme is clicked - the applyTheme function is called.

const addThemeSelector = () => {
  for (let i = 0; i < themes.length; i++) addCustomThemeSelector(themes[i])
}

const addCustomThemeSelector = (theme) => {
  let themeHeading = document.getElementById('theme-selection-container')

  const {
    name,
    colorPrimary,
    colorSecondary,
    colorTertiary,
    bgSecondary,
    bgPrimary
  } = theme

  themeDiv = document.createElement('div')
  themeDiv.setAttribute('id', `theme-${name}`)
  themeDiv.classList.add('theme')
  themeDiv.setAttribute('value', name)
  themeDiv.addEventListener('click', () => applyTheme(name))

  themeDiv.innerHTML = `
    <h6 class="palette-heading">${name}</h6>
    <div id="palette-${name}" class="colors"></div>
  `
  themeHeading.appendChild(themeDiv)

  const colorArray = [colorPrimary, colorSecondary, colorTertiary, bgSecondary, bgPrimary]

  for (let i = 0; i <= 4; i++) {
    const color = document.createElement('div')
    color.setAttribute('id', `${name}-col-${i}`)
    color.classList.add('color')

    if (name === 'custom') {
      color.innerHTML = `
        <input id="custom-color-${i}" type="color" value="#ffffff" onchange="applyCustomColor(id, value)">
      `
    }
    document.getElementById(`palette-${name}`).appendChild(color).style.backgroundColor = colorArray[i]
  }
}

const applyCustomColor = (id, value) => {
  const colorIndex = id[id.length - 1]
  const colArr = document.getElementById('palette-custom').getElementsByClassName('color')
  const col = colArr[colorIndex]
  col.style.backgroundColor = value

  console.log(colArr)

  let customColors = localStorage.getItem('customColors')
  customColors = JSON.parse(customColors)

  if (colorIndex == 0) { customColors.colorPrimary = value }
  else if (colorIndex == 1) { customColors.colorSecondary = value }
  else if (colorIndex == 2) { customColors.colorTertiary = value }
  else if (colorIndex == 3) { customColors.bgSecondary = value }
  else if (colorIndex == 4) { customColors.bgPrimary = value }

  localStorage.setItem('customColors', JSON.stringify(customColors))
  localStorage.setItem('userTheme', 'custom')
  applyTheme('custom')
}