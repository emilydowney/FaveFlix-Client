import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Avengers', Description: "When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's dream team are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).", ImagePath: 'https://i.pinimg.com/originals/0f/03/e6/0f03e6733b0cf567cc92e8e20290462f.jpg' },
        { _id: 2, Title: 'Stardust', Description: "To win the heart of his beloved (Sienna Miller), a young man named Tristan (Charlie Cox) ventures into the realm of fairies to retrieve a fallen star. What Tristan finds, however, is not a chunk of space rock, but a woman (Claire Danes) named Yvaine. Yvaine is in great danger, for the king's sons need her powers to secure the throne, and an evil witch (Michelle Pfeiffer) wants to use her to achieve eternal youth and beauty.", ImagePath: 'https://images-na.ssl-images-amazon.com/images/I/5100B4U4ylL._AC_.jpg' },
        { _id: 3, Title: 'Lord of the Rings: Return of the King', Description: "The culmination of nearly 10 years of work and conclusion to Peter Jackson's epic trilogy, The Lord of the Rings: The Return of the King presents the final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Hobbits Frodo and Sam reach Mordor in their quest to destroy the one ring, while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith.", ImagePath: 'http://www.limitedruns.com/media/cache/7e/6b/7e6b6743a7e45d096838abd67b2464e2.jpg' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}
