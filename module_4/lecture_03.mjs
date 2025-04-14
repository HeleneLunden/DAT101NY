import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

/*
This is a lecture in arrays and objects.
*/

class TMovie {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }
}

const movies = [];

function printMovies() {
  // iterate over the array
  for (let index = 0; index < movies.length; index++) {
    const movie = movies[index];
    printOut(movie.title + " " + movie.rating);
  }
}

movies.push(new TMovie("The Shawshank Redemption", 9.8));
movies.push(new TMovie("The Lord of the Rings: The Fellowship of the Ring", 8.8));
movies.push(new TMovie("The Godfather", 9.2));
movies.push(new TMovie("The Lord of the Rings: The Two Towers", 8.7));
movies.push(new TMovie("Schindler's List", 8.9));
movies.push(new TMovie("The Dark Knight", 9.5));
movies.push(new TMovie("Forrest Gump", 8.8));
movies.push(new TMovie("The Lord of the Rings: The Return of the King", 9.0));
movies.push(new TMovie("Fight Club", 8.8));
movies.push(new TMovie("Pulp Fiction", 8.9));
movies.push(new TMovie("Inception", 8.8));
movies.push(new TMovie("The Matrix", 8.7));

const ESortFieldType = { title: 1, rating: 2 };
let sortField;

function compareMovies(aMovieA, aMovieB) {
  let result;
  switch (sortField) {
    case ESortFieldType.rating:
      result = aMovieB.rating - aMovieA.rating;
      break;
    case ESortFieldType.title:
      result = aMovieA.title.localeCompare(aMovieB.title);
      break;
  }
  return result;
}

sortField = ESortFieldType.title;
movies.sort(compareMovies);

printMovies();
