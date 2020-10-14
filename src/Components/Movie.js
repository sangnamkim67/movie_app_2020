import React, { Component } from "react";
import "./Movie.css";

class movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.movie,
        };
    }
    render() {
        const { movie } = this.state;
        return (
            <section className="movie">
                <img src={movie.poster_path} alt={movie.title} />
                <div className="movie__data">
                    <h3 className="movie__title">{movie.title}</h3>
                    <h5 className="movie__date">{movie.release_date}</h5>
                    <h5 className="movie__rate">
                        평점 :{" "}
                        <span role="img" aria-label="star">
                            ⭐
                        </span>
                        {movie.vote_average}
                    </h5>
                    <ul className="movie__genres">
                        {movie.genre_ids.map((genre, index) => {
                            return (
                                <li key={index} className="genres__genre">
                                    {genre}
                                </li>
                            );
                        })}
                    </ul>
                    <p className="movie__summary">
                        {movie.overview.slice(0, 150)}...
                    </p>
                </div>
            </section>
        );
    }
}

export default movie;
