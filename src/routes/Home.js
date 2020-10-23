import React, { Component } from "react";
import axios from "axios";
import Movie from "../Components/Movie";
import "./Home.css";

class Home extends Component {
    state = {
        isLoading: true,
        movies: [],
    };

    // https://developers.themoviedb.org/ OPENAPI를 활용하여 인기도 높은 영화의 정보를 받아옴
    // movie data
    getMovies = () => {
        const API_KEY = "14ce7484c2d20fd447935baf71898e14";
        const MOVIES_URL = "https://api.themoviedb.org/3/movie/popular";
        return axios.get(MOVIES_URL, {
            params: {
                api_key: API_KEY,
                language: "ko-kr",
                page: 1,
                region: "KR",
            },
        });
    };
    getGenres = () => {
        const API_KEY = "14ce7484c2d20fd447935baf71898e14"; // THE MOVIE DATABASE OPENAPI KEY
        const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";
        return axios.get(GENRE_URL, {
            params: {
                api_key: API_KEY,
                language: "ko-KR",
            },
        });
    };
    // axios multi request : genre_id = 숫자 -> 한글, poster_path = image경로로 치환
    getMovieData = async () => {
        await axios.all([this.getMovies(), this.getGenres()]).then(
            axios.spread((movies, genres) => {
                this.setState({
                    isLoading: false,
                    movies: movies.data.results.map((movie) => {
                        return {
                            ...movie,
                            genre_ids: movie.genre_ids.map((data) => {
                                return genres.data.genres
                                    .filter((gs) => data === gs.id)
                                    .map((data) => {
                                        return data.name;
                                    })
                                    .toString();
                            }),
                            poster_path: `http://image.tmdb.org/t/p/w185${movie.poster_path}`,
                        };
                    }),
                });
            })
        );
    };

    componentDidMount() {
        this.getMovieData();
    }
    render() {
        const { isLoading, movies } = this.state;

        return (
            <div className="container">
                {isLoading ? (
                    <div className="loader">"Loading..."</div>
                ) : (
                    <div className="container__movie">
                        <h1>The Movie Database 선정 인기 영화</h1>
                        <div className="movies">
                            {movies.map((movie, index) => {
                                return (
                                    <Movie key={index} movie={movie}></Movie>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
