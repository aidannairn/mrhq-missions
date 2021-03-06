const themes = [
  {
    name: 'default',
    colorPrimary: '#212529',
    colorSecondary: '#495057',
    colorTertiary: '#ced4da',
    bgSecondary: '#dee2e6',
    bgPrimary: '#f8f9fa'
  },
  {
    name: 'dark',
    colorPrimary: '#f8f9fa',
    colorSecondary: '#dee2e6',
    colorTertiary: '#ced4da',
    bgSecondary: '#495057',
    bgPrimary: '#212529'
  },
  {
    name: 'candyfloss',
    colorPrimary: '#fb6f92',
    colorSecondary: '#ff8fab',
    colorTertiary: '#ffb3c6',
    bgSecondary: '#ffc2d1',
    bgPrimary: '#ffe5ec'
  },
  {
    name: 'nature',
    colorPrimary: '#6c584c',
    colorSecondary: '#a98467',
    colorTertiary: '#adc178',
    bgSecondary: '#dde5b6',
    bgPrimary: '#f0ead2'
  },
  // {
  //   name: '',
  //   colorPrimary: '',
  //   colorSecondary: '',
  //   colorTertiary: '',
  //   bgSecondary: '',
  //   bgPrimary: ''
  // }
]

const selectorThemeStyles = (theme) => {
  const {
    name,
    colorPrimary,
    colorSecondary,
    colorTertiary,
    bgSecondary,
    bgPrimary
  } = theme
  const styles = [
    {
      selectorType: 'applyThemeToTagNames',
      selectors: ['form'],
      css: {
        backgroundColor: bgSecondary
      }
    },
    {
      selectorType: 'applyThemeToClassNames',
      selectors: ['bg-secondary'],
      css: {
        backgroundColor: bgSecondary
      }
    },
    {
      selectorType: 'applyThemeToTagNames',
      selectors: ['a'],
      css: {
        color: colorPrimary
      }
    },
    {
      selectorType: 'applyThemeToIds',
      selectors: ['navbar'],
      css: {
        backgroundColor: bgSecondary
      }
    },
    {
      selectorType: 'applyThemeToTagNames',
      selectors: ['h2'],
      css: {
        color: colorSecondary
      }
    },
    {
      selectorType: 'applyThemeToPseudoClasses',
      selectors: ['#theme-selection-container .theme:nth-of-type(2n)'],
      css: {
        backgroundColor: bgSecondary
      }
    },
    {
      selectorType: 'applyThemeToTagNames',
      selectors: ['textarea', 'input'],
      css: {
        backgroundColor: bgPrimary,
        color: colorPrimary,
        borderColor: colorPrimary
      }
    },
    {
      selectorType: 'applyThemeToClassNames',
      selectors: ['horizontal-rule'],
      css: {
        borderColor: colorPrimary
      }
    },
    {
      selectorType: 'applyThemeToIds',
      selectors: ['dynamic-div-btn'],
      css: {
        backgroundColor: bgPrimary,
        borderColor: colorPrimary,
        color: colorPrimary
      }
    }
  ]
  return styles
}

export { themes, selectorThemeStyles }

