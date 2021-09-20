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

app.apiUrl = new URL('https://api.unsplash.com/photos/');
app.apiKey = 'K2sdLG2yACbMhSZqfdaiAzihh_avP6bmzIoN6C11n1Q'; 

// create method to get data from api 
app.getPhotos = () => { 
    // use url constructors to define parameters 
    const unsplashEndpoint = new URL(app.apiUrl); 
    unsplashEndpoint.search = new URLSearchParams({
        // pass in parameters 
        client_id: app.apiKey 
        
    });

    // request data with fetch api 
    fetch(unsplashEndpoint)
        .then((response) => {
            // parse response and convert into json object
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData);

        })
};

app.getUserInput = () => {
    app.form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event);
        const searchTerm = document.querySelector('#searchInput').value; 
        console.log(searchTerm);
    })
}

app.init = () => {
    app.form = document.querySelector('form')
    app.getUserInput(); 
    app.getPhotos();
}


app.init(); 