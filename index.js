const main=document.querySelector('main')

const API_URL= 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b760080de10e3e37846e8366ded67d02&page=';


const IMG_PATH= 'https://image.tmdb.org/t/p/w1280'

const SEARCH='https://api.themoviedb.org/3/search/movie?api_key=b760080de10e3e37846e8366ded67d02&query="';


const form= document.getElementById('form');

const searchtxt= document.querySelector('.search');




let page=1;



async function getMovies(url){
    const res= await fetch(url);
    const data= await res.json()

    // console.log(data.results);
    showMovies(data.results)
}



function showMovies(movies){
    main.innerHTML='';

    movies.forEach((movie)=>{
        const {title, poster_path, vote_average,overview,id}=movie;

        const moviebox=document.createElement('div');
        moviebox.className='movie';

        moviebox.innerHTML=`
        <a href="Details.html?id=${movie.id}">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        </a>
        <div class="movie-rating">
            <h3>${title}</h3>
            <span class=${getRating(vote_average.toFixed(1))}>${vote_average.toFixed(1)}</span>
        </div>
        `

        main.appendChild(moviebox)
    })
}


function getRating(num){
    if(num>=8){
        return 'green';
    }else if(num>5 && num <8){
        return 'orange';
    }else{
        return 'red';
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchval = searchtxt.value;

    if(searchval && searchval!==''){
        getMovies(SEARCH + searchval);
        searchtxt.value='';
    }else{
        window.location.reload();
    }
})


const prev = document.querySelector('.prev');
const next = document.querySelector('.next');


function nextpage(){
    page++;
    if(page>10){
        page=10;
        return;
    }
    if(page<=10){
        getMovies(API_URL + page);
    }
}

function prevpage(){
    page--;
    if(page>=1){
        getMovies(API_URL + page);
    }else{
        page=1;
    }
}


next.addEventListener('click',nextpage);
prev.addEventListener('click',prevpage);



getMovies(API_URL+page);

{/* <div class="overview">
<h3>Overview</h3><br>
${overview}
</div>  */}







