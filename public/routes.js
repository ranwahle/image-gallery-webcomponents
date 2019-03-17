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

    let result = true;
    if (!response.json) {
        result = false;
    }
    try {
        const data = await response.json()
        result =  !!data.content;

    } catch  {
        result =  false;
    }


    return result;


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

