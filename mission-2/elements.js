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
        attributes: { class: 'nav-btn' },
        content: 'One'
      },
      {
        tagName: 'a',
        attributes: { class: 'nav-btn' },
        content: 'Two'
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
    content: '[Insert content here]',
    childElements: [
      {
        tagName: 'h2',
        content: 'Inside content'
      },
      {
        tagName: 'div',
        content: 'Also inside content',
        childElements: [
          {
            tagName: 'h3',
            content: 'Inside div inside content'
          }
        ]
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