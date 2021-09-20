// description 
// - application that allows users to search for photos by keyword from the unsplash api and have photos displayed in a 3x3 grid with information about the photographers

// mvp goals 
// - searchbar
// - photo gallery (3x3 grid) 
// - photographers' information 

// stretch goals
// - incorporate colors from photos onto page (ie. border, box containing photographer's information, etc) 
// - links to photographers' social media pages  

// pseudo code 
// - initialize app with namespacing 
// - ensure data pulls from api by printing response data to console log 
// - when user clicks 'submit'/hits enter: 
    //* search unsplash database for photos according to user input value 
    //* clear any photo results and clear the input in the searchbar 
    //* pass in new photos in 3x3 grid and display photographers' information under each photo 
// - create error handling if api fails 


// declare app object 
const app = {}; 

app.apiUrl = new URL('https://api.unsplash.com/search/photos');
app.apiKey = 'K2sdLG2yACbMhSZqfdaiAzihh_avP6bmzIoN6C11n1Q'; 

// create method to get data from api 
app.getPhotos = (searchTerm) => { 
    // use url constructors to define parameters 
    const unsplashEndpoint = new URL(app.apiUrl); 
    unsplashEndpoint.search = new URLSearchParams({
        // pass in parameters 
        client_id: app.apiKey, 
        query: searchTerm
    });

    // request data with fetch api 
    fetch(unsplashEndpoint)
        .then((response) => {
            // parse response and convert into json object
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData.results);
            app.displayPhotos(jsonData.results); 
        })
};

// create a method to display photos to page 
app.displayPhotos = (jsonData) => {
    const gallery = document.querySelector('.gallery'); 
    jsonData.forEach( (img) => {
        const listItem = `
            <li>
            

            
            </li> 
        `; 
    })
} 

app.getUserInput = () => {
    app.form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event);
        const searchTerm = document.querySelector('#searchInput').value; 
        console.log(searchTerm);
        app.getPhotos(searchTerm);
    })
}

// create init method that will run when app loads
app.init = () => {
    app.form = document.querySelector('form')
    app.getUserInput(); 
}

// call the init method to kickstart our app 
app.init(); 