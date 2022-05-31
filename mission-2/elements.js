const elements = [
  {
    parentSelector: 'body',
    tagName: 'div',
    attributes: { id: 'theme-wrapper' }
  },
  {
    parentSelector: '#theme-wrapper',
    tagName: 'div',
    attributes: { id: 'navbar' }
  },
  {
    parentSelector: '#navbar',
    tagName: 'nav',
    childElements: [
      {
        tagName: 'a',
        attributes: { id: 'clear-btn', class: 'nav-btn' },
        content: 'Clear'
      },
      {
        tagName: 'a',
        attributes: { id: 'save-btn', class: 'nav-btn' },
        content: 'Save'
      },
      {
        tagName: 'a',
        attributes: { id: 'toggle-theme-select-btn', class: 'nav-btn' },
        content: 'Show Themes'
      }
    ]
  },
  {
    parentSelector: '#theme-wrapper',
    tagName: 'main'
  },
  {
    parentSelector: 'main',
    tagName: 'div',
    attributes: { id: 'theme-selection-container', class: 'hide' }
  },
  {
    parentSelector: '#theme-selection-container',
    tagName: 'h2',
    attributes: { id: 'theme-heading' },
    content: 'Choose your theme!'
  },
  {
    parentSelector: 'main',
    tagName: 'div',
    attributes: { id: 'content' },
    childElements: [
      {
        tagName: 'div',
        attributes: { id: 'dynamic-container' },
      }
    ]
  },
  {
    parentSelector: '#theme-wrapper',
    tagName: 'footer',
    attributes: { id: 'footer', class: 'bg-secondary' },
    content: 'Developed by Aidan Nairn'
  }
]

export { elements as default }