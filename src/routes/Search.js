import React, { Component } from "react";
import axios from "axios";
import SearchMovie from "../Components/SearchMovie";
import "./Search.css";

class Search extends Component {
    state = {
        isLoading: true,
        inputValue: "",
        movies: [],
    };

    getSearchMovie = async () => {
        const search = this.state.inputValue;
        const CLIENT_ID = "pCpuMhiCRw30kMKAufSW";
        const CLIENT_SECRET = "DjNU7OmUJA";
        try {
            if (search === "") {
                this.setState({
                    isLoading: false,
                    movies: [],
                });
            } else {
                await axios
                    .get("/v1/search/movie.json", {
                        params: {
                            query: search,
                            display: 20,
                        },
                        headers: {
                            "X-Naver-Client-Id": CLIENT_ID,
                            "X-Naver-Client-Secret": CLIENT_SECRET,
                        },
                    })
                    .then((response) => {
                        const { items } = response.data;
                        this.setState({
                            movies: items,
                            isLoading: false,
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } catch (e) {
            console.log(e);
        }
    };
    componentDidMount() {
        this.getSearchMovie();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.getSearchMovie();
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
                    <div>
                        <form onSubmit={this.handleSubmit}>
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
                                        <SearchMovie
                                            key={index}
                                            id={movie.link}
                                            movie={movie}
                                        />
                                    );
                                })}
                            </div>
                        </form>
                    </div>
                )}
            </section>
        );
    }
}

export default Search;
