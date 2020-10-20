import React, { Component } from "react";
import "./Movie.css";

class SearchMovie extends Component {
    state = {
        movie: this.props.movie,
    };

    render() {
        const { movie } = this.state;
        const title = movie.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");

        return (
            <section>
                <div className="movie">
                    <img
                        src={
                            movie.image
                                ? movie.image
                                : "http://placehold.it/120X180"
                        }
                        onerror="this.src='http://placehold.it/120X180'"
                        alt={title}
                    />
                    <div className="movie__data">
                        <h3 className="movie__title">{title}</h3>
                        <h5 className="movie__rate">
                            평점 :{" "}
                            <span role="img" aria-label="star">
                                ⭐
                            </span>
                            {movie.userRating}
                        </h5>
                        <h5 className="movie__date">
                            개봉년도 : {movie.pubDate}
                        </h5>
                        <h5 className="movie__director">
                            감독 : {movie.director}
                        </h5>
                        <h5 className="movie__actor">배우 : {movie.actor}</h5>
                    </div>
                </div>
            </section>
        );
    }
}

export default SearchMovie;
