const serieName = document.querySelector(".serie-name-input");
const searchButton = document.querySelector(".search-movie-button");
const moviesSection = document.querySelector(".movies-section");
const messageSection = document.querySelector(".message-section");
const messageSpan = document.querySelector(".message-span");
const seriePoster = document.querySelector(".seriePoster");
const key = "k_14fz9rc4";

const fetchAPI = async serie => {
    moviesSection.innerHTML = "";

    try{
        if(!serieName.value) throw new Error("Você precisa digitar o nome de uma série!")
        else {
            const url = await fetch(`https://imdb-api.com/en/API/SearchSeries/${ key }/${ serie }`);
            const responseJson = await url.json();

            if(responseJson.results.length === 0) {
                throw new Error("No results found, try another movie/series!")
            };
            
            responseJson.results.map(({ title, image }) => moviesSection.innerHTML += 
                `
                    <div class='movie-div'>
                        <img src=${ image } alt=${ title } class="movie-image" />
                        <h3 class="movie-title">${ title }</h3>
                    </div>
                `
            )

            messageSection.classList.add("hide-message-section");
        }
    }catch({ message }) {
        messageSection.classList.remove("hide-message-section");
        messageSpan.textContent = message;
    }
}

serieName.addEventListener("keyup", e => e.key === "Enter" && fetchAPI(serieName.value));
searchButton.addEventListener("click", () => fetchAPI(serieName.value))