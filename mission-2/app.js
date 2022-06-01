import { themes, selectorThemeStyles } from './themes.js'
import dynamicDiv from './dynamic-div.js'
import elements from './elements.js'

// Every element that is being rendered on the page should be passed through this function.
const addNewElement = (element, parentEl) => {
  const {
    parentSelector,
    tagName,
    attributes,
    content,
    childElements,
    eventListener
  } = element

  let parentElement
  parentSelector 
    ? parentElement = document.querySelector(parentSelector)
    : parentElement = parentEl

  let newElement = document.createElement(tagName)

  if (attributes) { 
    for (const key in attributes) { 
      newElement.setAttribute(key, attributes[key])
    }
  }

  if (content) newElement.textContent = content

  if (childElements) {
    childElements.forEach(element => {
      const childElement = addNewElement(element, newElement)
      return newElement.appendChild(childElement)
    })
  } 
  return parentElement.appendChild(newElement)
}

// START Theme
const addThemeSelector = (theme) => {
  const themeSelectionContainer = document.getElementById('theme-selection-container')

  const {
    name,
    colorPrimary,
    colorSecondary,
    colorTertiary,
    bgSecondary,
    bgPrimary
  } = theme

  const themeObj = {
    tagName: 'div',
    attributes: { id: `theme-${name}`, class: 'theme', value: name },
    childElements: [
      {
        tagName: 'h6',
        attributes: { class: 'palette-heading' },
        content: name
      },
      {
        tagName: 'div',
        attributes: { id: `palette-${name}`, class: 'colors' }
      }
    ]
  }

  const themeContainer = addNewElement(themeObj, themeSelectionContainer)
  themeContainer.addEventListener('click', () => applyTheme(name))

  themeSelectionContainer.appendChild(themeContainer)

  const colorArray = [colorPrimary, colorSecondary, colorTertiary, bgSecondary, bgPrimary]

  colorArray.forEach((colorItem, index) => {
    const colorObj = {
      parentSelector: `#palette-${name}`,
      tagName: 'div',
      attributes: { id: `${name}-col-${index}`, class: 'color' },
    }

    const color = addNewElement(colorObj)

    if (name === 'custom') {
      const colorInputObj = {
        tagName: 'input',
        attributes: { 
          id: `custom-color-${index}`, 
          type: 'color', 
          value: '#ffffff' 
        }
      }
      const colorInput = addNewElement(colorInputObj, color)

      colorInput.addEventListener('input', event => {
        applyCustomColor(colorInput.id, event.target.value)
      })
      /* 
          Activated via an Event Listener.
          When a custom color input is clicked - remove the transition delay that is applied to the Theme Wrapper on load. Doing so gives a more responsive feel when the user changes a color.

          This listener also adds an additional Event Listener to check when an element other than the current input is selected. If so, the transition delay of one second should be reapplied.
      */
      const handleColorInput = () => {
        const themeWrapper = document.getElementById('theme-wrapper')
        themeWrapper.style.transition = '0s'
        
        const handleColorInputEscape = event => {
          const withinBoundaries = event.composedPath().includes(colorInput)
          if (!withinBoundaries) {
            themeWrapper.style.transition = '1s'
            document.removeEventListener('click', handleColorInputEscape, true)
          }
        }
        // Added a third parameter to the Event Lister called a useCapture. By setting this value to true, the Event Listener can be removed later.
        document.addEventListener('click', handleColorInputEscape, true)
      }
      colorInput.addEventListener('click', (event) => handleColorInput(event))
    }
    color.style.backgroundColor = colorItem
  })
}

const toggleThemeSelect = () => {
  const themeSelectionContainer = document.getElementById('theme-selection-container')

  themeSelectionContainer.classList.toggle('hide')

  let isVisible = themeSelectionContainer.classList.contains('hide')
  toggleThemeSelectBtn.textContent = `${isVisible ? 'Show Themes' : 'Hide Themes'}`
}

const addTheme = (theme) => {
  const {
    name,
    colorPrimary,
    colorSecondary,
    colorTertiary,
    bgSecondary,
    bgPrimary
  } = theme

  const themeWrapper = document.getElementById('theme-wrapper')
  themeWrapper.style.backgroundColor = bgPrimary
  themeWrapper.style.borderColor = bgSecondary
  themeWrapper.style.color = colorPrimary

  const selectThemeBy = (type, selectors) => {
    let selectorArray = []
    const selectorTypes = {
      applyThemeToClassNames: function(selector){
        const elements = document.getElementsByClassName(selector)
        selectorArray = [...selectorArray, ...elements]
      },
      applyThemeToTagNames: function(selector){
        const elements = (document.getElementsByTagName(selector))
        selectorArray = [...selectorArray, ...elements]
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

  selectorThemeStyles(theme).forEach(customStyleObj => {
    const { selectorType, selectors, css } = customStyleObj
    const stylesItemArray = selectThemeBy(selectorType, selectors)

    for (let i = 0; i < stylesItemArray.length; i++) {
      const index = i
      for (const key in css) {
        stylesItemArray[index].style[key] = css[key]
      }
    }
  })

  localStorage.setItem('userTheme', name)
  return themeWrapper
}

const applyTheme = (themeName) => {
  const savedCustomColors = localStorage.getItem('customColors')
  const savedThemeColors = JSON.parse(savedCustomColors)

  const colorArray = [
    savedThemeColors.colorPrimary,
    savedThemeColors.colorSecondary,
    savedThemeColors.colorTertiary,
    savedThemeColors.bgSecondary,
    savedThemeColors.bgPrimary,
  ]

  colorArray.forEach((color, index) => {
    document.getElementById(`custom-col-${index}`).style.backgroundColor = color
  })
  
  if (themeName === 'custom') {
    addTheme(savedThemeColors)
  } else {
    themes.forEach(theme => {
      if (theme.name === themeName) { addTheme(theme) }
    })
  }
}

const applyCustomColor = (id, value) => {
  const colorIndex = id[id.length - 1] // Get the value of the last character of the id. The last character will always be a number between 0 and 4.
  const colArr = document.getElementById('palette-custom').getElementsByClassName('color')
  const col = colArr[colorIndex]
  col.style.backgroundColor = value

  let customColors = localStorage.getItem('customColors')
  customColors = JSON.parse(customColors)

  // Match the Color Index to a number and set the new color value accordingly.
  if (colorIndex == 0) { customColors.colorPrimary = value }
  else if (colorIndex == 1) { customColors.colorSecondary = value }
  else if (colorIndex == 2) { customColors.colorTertiary = value }
  else if (colorIndex == 3) { customColors.bgSecondary = value }
  else if (colorIndex == 4) { customColors.bgPrimary = value }

  localStorage.setItem('customColors', JSON.stringify(customColors))
  localStorage.setItem('userTheme', 'custom')
  applyTheme('custom')
}
// END Theme
// START Dynamic Content
const addDynamicContent = () => {
  if (document.querySelector('input[name="elem-type"]')) {
    const textInputContainer = document.getElementById('text-input-container')
    const imageInputContainer = document.getElementById('image-input-container')
    document.querySelectorAll('input[name="elem-type"]').forEach((elem) => {
      elem.addEventListener("change", event => {
        var elemType = event.target.value
        switch (elemType) {
          case 'img':
            imageInputContainer.classList.remove('hide')
            textInputContainer.classList.add('hide')
          break;
          case 'hr':
            imageInputContainer.classList.add('hide')
            textInputContainer.classList.add('hide')
          break;
          default:
            imageInputContainer.classList.add('hide')
            textInputContainer.classList.remove('hide')
          break;
        }
      })
    })
  }
  
  const handleDynamicDivSubmit = (event) => {
    event.preventDefault()
    const elemType = document.querySelector("input[name='elem-type']:checked").value

    const contentInput = document.getElementById('dynamic-content-text')
    const content = contentInput.value

    const image = document.getElementById('dynamic-content-image').value

    const dynamicContent = document.getElementById('dynamic-content')

    const dynamicDivContent = {
      parentSelector: '#dynamic-content',
      tagName: elemType,
      content: content
    } 

    if (elemType === 'hr') {
      dynamicDivContent.content = ''
      dynamicDivContent.attributes = { class: 'horizontal-rule' }
    }

    if (elemType === 'img') {
      dynamicDivContent.content = ''
      dynamicDivContent.attributes = { class: 'dynamic-image', src: image }
    }

    dynamicContent.append(addNewElement(dynamicDivContent))

    contentInput.value = ''
  }
  const dynamicDivForm = document.getElementById('dynamic-form')

  dynamicDivForm.addEventListener('submit', handleDynamicDivSubmit)
}

const loadDynamicDiv = () => {
  if (localStorage.dynamicDiv != null) {
    const dynamicContent = document.getElementById('dynamic-content')
    const dynamicDiv = localStorage.getItem('dynamicDiv')
    dynamicContent.innerHTML = ''
    dynamicContent.innerHTML += dynamicDiv
  }
}

const clearDynamicDiv = () => {
  console.log('clicked')
  const dynamicContent = document.getElementById('dynamic-content')
  dynamicContent.innerHTML = ''
}

const saveDynamicDiv = () => {
  const dynamicContent = document.getElementById('dynamic-content').innerHTML
  localStorage.setItem('dynamicDiv', dynamicContent)
}

// START On page load - Do the following.
// Render all initial elements stored in elements.js file.
elements.forEach(element => addNewElement(element))

// Add each theme from themes.js file to the theme selector
themes.forEach(theme => addThemeSelector(theme))

// Check to see whether a theme has been saved to localStorage. If it has - apply that theme by retrieving the theme name and using it as a parameter for the applyTheme function. If not - set the theme name to 'default' and call the applyTheme function.
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

document.getElementById('theme-wrapper').style.transition = '1s'

addThemeSelector(customColors)

addNewElement(dynamicDiv)

addDynamicContent()

loadDynamicDiv()

applyTheme(themeName)

// Add Event Listeners
const clearBtn = document.getElementById('clear-btn')
clearBtn.addEventListener('click', clearDynamicDiv)

const saveBtn = document.getElementById('save-btn')
saveBtn.addEventListener('click', saveDynamicDiv)

const toggleThemeSelectBtn = document.getElementById('toggle-theme-select-btn')
toggleThemeSelectBtn.addEventListener('click', toggleThemeSelect)