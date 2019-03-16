const imageExistGuard = async path => {

    if (!path) {
        console.error('no path');
        return false;
    }
    const imageId = path.split('/')[2];

    if (!imageId) {
        return false;
    }

    const response = await fetch(`/images/${imageId}`);

    if (!response.json) {
        return false;
    }
    try {
        const data = await response.json()
        return !!data.content;

    } catch  {
        return false;
    }


};

export default [
    {path: '/', element: 'div', attributes: {is: 'images-container'}}
    ,
    {
        path: '/addImage',
        element: 'div',
        attributes: {is: 'add-image'}
    }, {
        path: 'image/:index',
        element: 'div',
        attributes: {is: 'detailed-image'},
        guard: imageExistGuard
    }

];

