const API_URL = "https://api.themoviedb.org/3/movie/?api_key=b760080de10e3e37846e8366ded67d02"
const IMG_URL = "https://image.tmdb.org/t/p/w1280/"


const section1 = document.querySelector('.Data1')
const section2 = document.querySelector('.Data2')




function updateContent(movie) {
    const div1 = document.createElement('div');
    div1.classList.add('content');

    div1.innerHTML = `
    <div class="image">
        <img src="https://image.tmdb.org/t/p/w1280${movie.poster_path}" alt="">
    </div>
    <div class="info">
        <h1>${movie.title}</h1>
        <h3><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(1)}/10</h3>
        <p>Release Date:${movie.release_date}</p>
        <p>${movie.overview}</p>
        <ul class="genre">
            <li><h3>Genres</h3></li>
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
    </div>
    `
    section1.style.backgroundImage = `url(${IMG_URL + movie.backdrop_path})`

    const div2 = document.createElement('div');
    div2.classList.add('moneyinfo');

    div2.innerHTML = `
        <h1>Movie Info</h1>
        <div class="stats"><span class="box-office">Budget:</span> $${movie.budget}</div>
        <div class="stats"><span class="box-office">Revenue:</span> $${movie.revenue}</div>
        <div class="stats"><span class="box-office">Runtime:</span> ${movie.runtime} minutes</div>
        <div class="stats"><span class="box-office">Status:</span> ${movie.status}</div>
    `

    section1.appendChild(div1)
    section2.appendChild(div2)
}






async function getDetails() {
    const id = window.location.search.split('=')[1];
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b760080de10e3e37846e8366ded67d02`);
    const data = await res.json();

    updateContent(data);
}




getDetails();
