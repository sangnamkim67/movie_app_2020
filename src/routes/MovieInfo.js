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
                    movie: {
                        ...response.data,
                        backdrop_path: `http://image.tmdb.org/t/p/w1920_and_h800_multi_faces${response.data.backdrop_path}`,
                        poster_path: `http://image.tmdb.org/t/p/w300_and_h450_bestv2${response.data.poster_path}`,
                        genres: response.data.genres.map((genre) => {
                            return genre.name;
                        }),
                    },
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
            console.log(movie);
            return (
                <div
                    className="info__backdropimage"
                    style={{
                        backgroundImage: `url(${movie.backdrop_path})`,
                    }}
                >
                    <div className="info__customBg">
                        <div className="info__singCol">
                            <div className="info__container">
                                <div className="info__poster__wrapper">
                                    <img
                                        className="movie__poster"
                                        src={movie.poster_path}
                                        alt={movie.title}
                                    />
                                </div>

                                <div className="info__data">
                                    <h1 className="info__title">
                                        {movie.title}
                                    </h1>
                                    <h3 className="info__tagline">
                                        {movie.tagline}
                                    </h3>
                                    <ul className="info__genres">
                                        {movie.genres !== undefined
                                            ? movie.genres.map((genre, idx) => {
                                                  return (
                                                      <li key={idx}>{genre}</li>
                                                  );
                                              })
                                            : null}
                                    </ul>
                                    <div className="info__release__date">
                                        개봉일 : {movie.release_date}
                                    </div>
                                    <h5 className="info__rate">
                                        평점 :{" "}
                                        <span role="img" aria-label="star">
                                            ⭐
                                        </span>
                                        {movie.vote_average}
                                    </h5>
                                    <h3 dir="auto">개요</h3>
                                    <p className="info__overview">
                                        {movie.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MovieInfo;
