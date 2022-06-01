const dynamicDiv = {
  parentSelector: '#dynamic-container',
  tagName: 'div',
  attributes: { 
    id: 'dynamic-div',
    class: 'dynamic-div' 
  },
  childElements: [
    {
      tagName: 'h2',
      content: 'Add Your Content Below!'
    },
    {
      tagName: 'div',
      attributes: { id: 'dynamic-content', class: 'dynamic-content' }
    },
    {
      tagName: 'form',
      attributes: { id: 'dynamic-form'},
      childElements: [
        {
          tagName: 'div',
          attributes: { class: 'form-input-container'},
          childElements: [
            {
              tagName: 'label',
              attributes: { class: 'bold'},
              content: 'Select The Element Type:'
            },
            {
              tagName: 'div',
              childElements: [
                {
                  tagName: 'label',
                  content: 'Heading'
                },
                {
                  tagName: 'input',
                  attributes: { type: 'radio', value: 'h3', name: 'elem-type', checked: 'checked' }
                }
              ]
            },
            {
              tagName: 'div',
              childElements: [
                {
                  tagName: 'label',
                  content: 'Subheading'
                },
                {
                  tagName: 'input',
                  attributes: { type: 'radio', value: 'h5', name: 'elem-type' }
                }
              ]
            },
            {
              tagName: 'div',
              childElements: [
                {
                  tagName: 'label',
                  content: 'Paragraph'
                },
                {
                  tagName: 'input',
                  attributes: { type: 'radio', value: 'p', name: 'elem-type' }
                }
              ]
            },
            {
              tagName: 'div',
              childElements: [
                {
                  tagName: 'label',
                  content: 'Image'
                },
                {
                  tagName: 'input',
                  attributes: { type: 'radio', value: 'img', name: 'elem-type' }
                }
              ]
            },
            {
              tagName: 'div',
              childElements: [
                {
                  tagName: 'label',
                  content: 'Horizontal Rule'
                },
                {
                  tagName: 'input',
                  attributes: { type: 'radio', value: 'hr', name: 'elem-type' }
                }
              ]
            }
          ]
        },
        {
          tagName: 'div',
          attributes: { id: 'text-input-container', class: 'form-input-container'},
          childElements: [
            {
              tagName: 'label',
              attributes: { class: 'bold'},
              content: 'Please enter some text:'
            },
            {
              tagName: 'textarea',
              attributes: { id: 'dynamic-content-text'},
              // content: 'Please enter some text...'
            }
          ]
        },
        {
          tagName: 'div',
          attributes: { id: 'image-input-container', class: 'form-input-container hide'},
          childElements: [
            {
              tagName: 'label',
              attributes: { class: 'bold'},
              content: 'Please enter an image URL:'
            },
            {
              tagName: 'input',
              attributes: { 
                id: 'dynamic-content-image',
                value: 'https://images.unsplash.com/photo-1653559260394-ee10e61e0155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
              },
            }
          ]
        },
        {
          tagName: 'button',
          attributes: { id: 'dynamic-div-btn', value: 'submit' },
          content: 'Add'
        }
      ]
    }
  ]
}  

export { dynamicDiv as default }