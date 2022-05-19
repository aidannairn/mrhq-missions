// Function is given the theme name as a parameter. If the theme name exists in an object in the themes.js file it will set the theme colors accordingly. It will also save the theme name to local storage so that the theme persists after page refresh.

const applyTheme = (themeName) => {
  const themeWrapper = document.getElementById('theme-wrapper')

  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i]

    if (theme.name === themeName) {
      themeWrapper.style.backgroundColor = theme.bgPrimary
      themeWrapper.style.borderColor = theme.bgSecondary
      themeWrapper.style.color = theme.colorPrimary

      const selectorThemeStyles = [
        {
          selectorType: 'className',
          selector: 'bg-secondary',
          css: {
            backgroundColor: theme.bgSecondary
          }
        },
        {
          selectorType: 'tagName',
          selector: 'a',
          css: {
            color: theme.colorPrimary
          }
        }
      ]

      for (let i = 0; i < selectorThemeStyles.length; i++) {
        const stylesItem = selectorThemeStyles[i]
        let customCss = stylesItem.css
        let stylesItemArray

        if (stylesItem.selectorType === 'className') { stylesItemArray = document.getElementsByClassName(stylesItem.selector) }
        if (stylesItem.selectorType === 'tagName') { stylesItemArray = document.getElementsByTagName(stylesItem.selector) }
        if (stylesItem.selectorType === 'id') { stylesItemArray = document.getElementsById(stylesItem.selector) }

        for (let i = 0; i < stylesItemArray.length; i++) {
          const index = i
          for (const key in customCss) {
            console.log(stylesItemArray[index])
            stylesItemArray[index].style[key] = customCss[key]
            
            console.log(stylesItem)
          }
        }

        for (const key in selectorThemeStyles[i]) {
          console.log(stylesItem[key])
        }
      }

      localStorage.setItem('userTheme', themeName)
    }
  }
  return themeWrapper
}

// When the body element loads/reloads this function will check to see whether a theme has been saved to localStorage. If it has - apply that theme by retrieving the theme name and using it as a parameter for the applyTheme function. If not - set the theme name to 'default' and call the applyTheme function.

const checkTheme = () => {
  let themeName

  if (localStorage.userTheme != null) {
    themeName = localStorage.getItem('userTheme')
  } else {
    themeName = 'default'
  }

  applyTheme(themeName)
}

// This function dynamically renders theme selection boxes within the Theme Selection Container div. Each theme selection box is given a unique id, a class of 'theme', a color palette, and includes an event listener so that when a theme is clicked - the applyTheme function is called.

const addThemeSelector = () => {
  let themeHeading = document.getElementById('theme-selection-container')
  
  for (let i = 0; i < themes.length; i++) {
    const themeId = i
    let theme

    theme = document.createElement('div')
    theme.setAttribute('id', `theme-${i}`)
    theme.classList.add('theme')
    theme.setAttribute('value', themes[i].name)
    theme.addEventListener('click', (e) => applyTheme(themes[i].name))

    theme.innerHTML = `
      <h6 class="palette-heading">${themes[i].name}</h6>
      <div id="palette-${i}" class="colors"></div>
    `

    themeHeading.appendChild(theme)

    const colorArray = [
      themes[i].colorPrimary,
      themes[i].colorSecondary,
      themes[i].colorTertiary,
      themes[i].bgSecondary,
      themes[i].bgPrimary,
    ]

    for (let i = 0; i <= 4; i++) {
      const color = document.createElement('div')
      color.classList.add('color')

      document.getElementById(`palette-${themeId}`).appendChild(color).style.backgroundColor = colorArray[i]
    }
  }
}