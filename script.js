'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
    const html = `
                <article class="country ${className}">
                    <img src="${data.flags.png}" class="country__img" />
                    <div class="country__data">
                        <h3 class="country__name">${data.name.common}</h3>
                        <h4 class="country__region">${data.region}</h4>
                        <p class="country__row">
                            <span>🧑‍🤝‍🧑</span>${(+data.population / 1000000).toFixed(1)} people
                        </p>
                        <p class="country__row">
                            <span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}
                        </p>
                        <p class="country__row">
                            <span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}
                        </p>
                    </div>
                </article>
            `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend',msg);
    // countriesContainer.style.opacity = 1;
}



// // Modern way of api calls using fetch function

// const getCountryData = function (country) {
//     const request = fetch(`https://restcountries.com/v3.1/name/${country}`);

//     // request is a promise and responcse is the value of the promise
//     const req = request.then((response)=>{
//         console.log(response);
//         return response.json(); // returns a promise
//     })

//     req.then(function(data){
//         console.log(data[0]);
//         console.log("going into renderCountry");
//         renderCountry(data[0]);

//         const neighbour = data[0].borders[0];
//         const req2 = fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//         console.log(req2);

//         const res2 = req2.then((response)=>{
//             // console.log(response);
//             return response.json(); // returns neighbouring promise
//         })

//         console.log(res2);
//         res2.then((data)=>{
//             console.log(data[0]);
//             renderCountry(data[0],'neighbour');
//         })
//     })
// };


const getJSON = function(url,errorMessage = 'Something went wrong'){
    return fetch(url)
    .then(function(response){

        // check the ok property to see country found or not
        if(!response.ok){
            throw new Error(`${errorMessage} (${response.status})`);
        }
        // console.log(response);
        return response.json();
    })

}

const getCountryData = function(country){
    if(country === 'India') country = 'bharat';
    getJSON(`https://restcountries.com/v3.1/name/${country}`,'Country not found')
    .then((data)=>{
        console.log(data[0]);
        renderCountry(data[0]);
        // getting neighbouring country

        // hasOwnProperty tells wheather "..." property exist or not 
        if(!data[0].hasOwnProperty("borders")){ throw new Error('No neighbour Exist!'); }
        const neighbours = data[0].borders[0];
        // console.log("hi");

        if(!neighbours){ throw new Error('No neighbour Exist!'); }

        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbours}`,'Country not found')
    })
    .then(data=>renderCountry(data[0],'neighbour'))
    .catch(err => {
        console.error(`${err} 💥💥💥💥💥`);
        renderError(`Something went wrong 💥💥💥${err.message}. Try Again`);
    })
    .finally(()=>{
        countriesContainer.style.opacity = 1;
    })
}


btn.addEventListener('click',function(){
    whereAmI(19.037, 72.873);  //India
    // whereAmI(52.508, 13.381);
    // getCountryData('bharat');
    // getCountryData('australia');
    // getCountryData('fwefnew');
})
// getCountryData('russia');


///////////////////////////////////////////////////////////////

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀

*/


const whereAmI = function (latitude, longitude) {
    const req = fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=632423280315957209588x106422`);
    console.log(req);
        req.then((response) => {
            console.log(response);
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            getCountryData(data.country);
        }).catch(err => {
            console.error(err);
        })
}


// whereAmI(-33.933, 18.474);