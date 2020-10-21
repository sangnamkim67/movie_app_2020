import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

class movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.movie,
        };
    }
    render() {
        // props로 받은 영화 데이터를 state에 저장
        const { movie } = this.state;

        return (
            <Link
                to={{
                    pathname: `/movieinfo/${movie.title}`,
                    state: {
                        movie: movie,
                    },
                }}
                style={{ textDecoration: "none", color: "black" }}
            >
                <section className="movie">
                    <img src={movie.poster_path} alt={movie.title} />
                    <div className="movie__data">
                        <h3 className="movie__title">{movie.title}</h3>
                        <h5 className="movie__date">
                            개봉일 : {movie.release_date}
                        </h5>
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
                            {movie.overview.slice(0, 90)}...
                        </p>
                    </div>
                </section>
            </Link>
        );
    }
}

export default movie;
