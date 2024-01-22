// // const btn = document.querySelector('.btn-country');
// // const countriesContainer = document.querySelector('.countries');

// // function getCountryAndNeighbour(country) {
// //     const request = new XMLHttpRequest();
// //     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// //     request.send();
// //     // console.log('HI');

// //     request.addEventListener('load', function () {
// //         const [data] = JSON.parse(this.responseText);
// //         console.log(data);
// //         renderCountry(data);

// //         const [neighbour] = data.borders;
// //         if(!neighbour) return;

// //         const request2 = new XMLHttpRequest();
// //         request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`);
// //         request2.send();

// //         request2.addEventListener('load',function(){
// //             const [data2] = JSON.parse(this.responseText);
// //             console.log(data2);
// //             renderCountry(data2,'neighbour');
// //         })
// //     });
// // }

// // Make requests for both "bharat" and "usa"
// // getCountryAndNeighbour("bharat");
// // getCountryData("usa");
// // getCountryData("pakistan");
// // getCountryData("russia");

// const fullName = Object.keys(obj).map(name => {
//     return `${obj[name]} ${obj[name]}`;
// }).join(',');
// console.log(fullName);

// Inside render function

// console.log(typeof (data));
    // console.log(data);
    // const currencies = Object.keys(data.currencies).map(currencyCode => {
    //     return `${data.currencies[currencyCode].name} (${currencyCode})`;
    // }).join(', ');

    // const languages = Object.keys(data.languages).map(language => {
    //     return `${data.languages[language]}`;
    // });

// function getCountryData(country) {
//     // const request = fetch(`https://restcountries.com/v3.1/name/${country}`);
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json()).then(data =>{
//         // console.log(data[0])
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];
//         if(!neighbour){
//             return;
//         }
//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response2 => response2.json())
//     .then(data2 => {
//         renderCountry(data2);
//     })
// }

// getCountryData('bharat');



// const request = fetch('https://restcountries.com/v3.1/name/bharat');
// console.log(request);