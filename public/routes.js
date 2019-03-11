export default  [
    {path: '/', element: 'div', attributes: {is: 'images-container'}}
    ,
    {
        path: '/addImage',
        element: 'div',
        attributes: {is: 'add-image'}
    }, {
        path: 'image/:index',
        element: 'div',
        attributes: {is: 'detailed-image'}
    }

]

