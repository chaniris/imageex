// description 
// - application that allows users to search for photos by keyword from the unsplash api and have photos displayed in a 3x3 grid with information about the photographers


// declare app object 
const app = {};

app.apiUrl = new URL('https://api.unsplash.com/search/photos');
app.apiKey = 'K2sdLG2yACbMhSZqfdaiAzihh_avP6bmzIoN6C11n1Q';


app.renderError = function (error) {
    const body = document.querySelector('body');
    console.log('From renderError function', error);

    const html = `
        <div class="errorContainer">
            <p class="errorCopy">${error.message}</p>
        </div>
    `; setTimeout(function () {
        document.querySelector('.errorContainer').style.visibility = 'hidden';
    }, 2000);

    body.insertAdjacentHTML('afterbegin', html);
}


// create method to get data from api 
app.getPhotos = (searchTerm) => {
    // use url constructors to define parameters 
    const unsplashEndpoint = new URL(app.apiUrl);
    unsplashEndpoint.search = new URLSearchParams({
        // pass in parameters 
        client_id: app.apiKey,
        query: searchTerm, 
        per_page: 12
    });

    // request data with fetch api 
    fetch(unsplashEndpoint)
        .then((response) => {

            if (response.ok === true) {
                // parse response and convert into json object
                return response.json();
            } else if (response.ok === false) {
                throw new Error('<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong.');
            }

        })
        .then((jsonData) => {

            if (jsonData.total === 0) {
                throw new Error('<i class="fas fa-exclamation-circle"></i> No results found.  Please try again.');
            }
            app.displayPhotos(jsonData.results);
        })
        .catch((error) => {
            app.renderError(error);
        })
};

app.renderTwitter = function(img) {
  if(img.user.twitter_username) { 
    const showTwitterLink = `
      <i class="fab fa-twitter"></i>
      <a href="https://twitter.com/${img.user.twitter_username}" target="_blank">${img.user.twitter_username}</a>
    `;
    return showTwitterLink; 
  } else { 
    return ''; 
  } 
}

app.renderInstagram = function(img) {
  if(img.user.instagram_username) { 
    const showInstagramLink = `
      <i class="fab fa-instagram"></i>
      <a href="https://instagram.com/${img.user.instagram_username}" target="_blank">${img.user.instagram_username}</a>
    `;
    return showInstagramLink; 
  } else { 
    return ''; 
  } 
}

// create a method to display photos to page 
app.displayPhotos = (jsonData) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    jsonData.forEach((img) => {
        const listItem = `
            <li class ="galleryCard">
                <div class ="imgContainer"><img src="${img.urls.regular}" alt="${img.alt_description}"></div>
                <div class ="textContainer">
                    <p class="photoInfo">${img.user.name}</p>
                    <p>
                        ${app.renderTwitter(img)}
                    </p>
                    <p>
                        ${app.renderInstagram(img)}
                    </p>
                </div>
            </li>
        `;
        gallery.insertAdjacentHTML('beforeend', listItem);
    })
}

app.getUserInput = () => {
    app.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = document.querySelector('#searchInput').value;
        document.querySelector('#searchInput').value = '';
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