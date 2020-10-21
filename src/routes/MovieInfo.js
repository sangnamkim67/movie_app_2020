import React, { Component } from "react";
import axios from "axios";
import "./MovieInfo.css";
class MovieInfo extends Component {
    state = {
        movie: {},
    };

    getMovieDetail = async (info) => {
        const API_KEY = "14ce7484c2d20fd447935baf71898e14"; // THE MOVIE DATABASE OPENAPI KEY
        const { movie } = info;
        const movieId = movie.id;

        await axios
            .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                    language: "ko-kr",
                },
            })
            .then((response) => {
                this.setState({
                    movie: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    componentDidMount() {
        const { location, history } = this.props;
        const { state } = location;
        if (state === undefined) {
            history.push("/", undefined);
        } else {
            this.getMovieDetail(state);
        }
    }
    render() {
        const { location } = this.props;
        const { state } = location;

        if (state === undefined) {
            return null;
        } else {
            const { movie } = this.state;
            const poster_path = `http://image.tmdb.org/t/p/w185${movie.poster_path}`;

            movie.genres.map((genre, idx) => {
                console.log(genre.name);
                return idx;
            });

            return (
                <div className="info__container">
                    <img
                        className="movie__poster"
                        src={poster_path}
                        alt={movie.title}
                    />
                    {movie.genres !== undefined
                        ? movie.genres.map((genre) => {
                              return <li>{genre}</li>;
                          })
                        : null}
                    {/* <p>{movie.genres}</p> */}
                    {/* <ul>
                        {movie.genres.map((genre) => {
                            return <li>{genre}</li>;
                        })}
                    </ul> */}
                    <h1 className="movie__title">{movie.title}</h1>
                    <div className="movie__tagline">{movie.tagline}</div>
                    <div className="movie__overview">{movie.overview}</div>
                </div>
            );
        }
    }
}

export default MovieInfo;
