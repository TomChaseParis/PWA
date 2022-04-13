const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = ""; // Chaîne de caractères vides 
let movies = [];

const fetchMovies = async () => {
  movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}`
  ).then((res) => res.json()); // .then = Une fois qu'on a ce résultat, il nous convertit le JSON
  console.log(movies);
};

/* Pour rendre le résultat visible à l'image */
// (A faire tout à la fin)

const moviesDisplay = async () => {
  await fetchMovies(); // On lui demande d'aller la jouer, de nous convertir le bon format pour que ce soit lisible et de l'afficher dans le navigateur

  movies.results.length = 12; // On limite le nombre de résultats à 12 films

  result.innerHTML = movies.results
    .map(
      (movie) => // Va nous maper chaque élément au singuler d'où le movie sans le s
        `
      <li>
        <h2>${movie.original_title}</h2>
        <div class="card-content">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
          <div class="infos">
            <p>${movie.overview}</p>
            <p>Popularité : ${movie.popularity} ⭐</p>
          </div>
        </div>
      </li>
    `
    )
    .join("");
};

/* On va ensuite créer un addEventListener quand on a submit */

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search = searchInput.value;
  moviesDisplay();
});