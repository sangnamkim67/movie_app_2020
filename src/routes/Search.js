import React, { Component } from "react";
import axios from "axios";
import SearchMovie from "../Components/SearchMovie";
import "./Search.css";

class Search extends Component {
    state = {
        isLoading: true,
        inputValue: "",
        movies: [],
        genres: [],
    };
    getSearchResult = async () => {
        const API_KEY = "14ce7484c2d20fd447935baf71898e14"; // THE MOVIE DATABASE OPENAPI KEY
        const search = this.state.inputValue;

        try {
            if (search === "") {
                this.setState({
                    isLoading: false,
                    movies: [],
                    inputValue: "",
                });
            } else {
                await axios
                    .get("https://api.themoviedb.org/3/search/movie", {
                        params: {
                            api_key: API_KEY,
                            language: "ko-kr",
                            query: search,
                            page: 1,
                            include_adult: false,
                        },
                    })
                    .then((response) => {
                        const { results } = response.data;

                        results.map((movie) => {
                            movie.backdrop_path = `http://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`;
                            movie.poster_path = `http://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`;
                            return movie;
                        });

                        this.setState({
                            isLoading: false,
                            movies: results,
                        });
                    });
            }
        } catch (e) {
            console.log(e);
        }
    };
    getGenres = async () => {
        const API_KEY = "14ce7484c2d20fd447935baf71898e14"; // THE MOVIE DATABASE OPENAPI KEY
        const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";
        await axios
            .get(GENRE_URL, {
                params: {
                    api_key: API_KEY,
                    language: "ko-KR",
                },
            })
            .then((response) => {
                const { genres } = response.data;
                this.setState({
                    genres: genres,
                });
            });
    };

    componentDidMount() {
        this.getSearchResult();
        this.getGenres();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.getSearchResult();

        this.setState({
            inputValue: "",
            movies: [],
        });
    };
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            inputValue: e.target.value,
        });
    };

    render() {
        const { inputValue, isLoading, movies } = this.state;

        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">"Loading..."</div>
                ) : (
                    <form
                        className="input__movieInfo"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="input__div">
                            <h1>영화 검색</h1>
                            <input
                                placeholder="찾으실 영화를 입력하세요."
                                value={inputValue}
                                onChange={this.handleChange}
                                name="movie"
                            ></input>
                        </div>
                        <div className="movies">
                            {movies.map((movie, index) => {
                                return (
                                    <SearchMovie key={index} movie={movie} />
                                );
                            })}
                        </div>
                    </form>
                )}
            </section>
        );
    }
}

export default Search;
