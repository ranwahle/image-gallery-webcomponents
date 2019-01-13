# Image Gallery 

This code demonstrates image gallery build without any framework, but solely on HTML5 Web components and vanilla javascript

## Running the application
```bash
$ git clone https://github.com/ranwahle/image-gallery-webcomponents.git
$ npm install
$ npm start
```  

browse http://localhost:3000 
(3000 is the default port, it may change with env variables)


## Tech stack 
    
  #### Server side 
   Express 
   
  #### Client side (under ./public folder)
   1. Pure HTML, javascript & CSS 
   2. Fontawesome icons    
    


## Implementation

Because server side was not the main issue for this demo, the images are actually stored in the server memory. 
It gives us persistence between refreshes, however, all data are lost when the server is restarted.

On the client side we've divided to components

1. Image gallery component
2. Add image compoennt: Contains a form to add the image 
3. Small image component: Present image in grid layout (image & title)
4. Detailed imege component: Present real size image with title, description and date properties.
    Also provides mechanism to change the title and delete the image
     
    
