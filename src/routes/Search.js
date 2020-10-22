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
                    inputValue: "",
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
                        if (error.response) {
                            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                            // Node.js의 http.ClientRequest 인스턴스입니다.
                            console.log(error.request);
                        } else {
                            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                            console.log("Error", error.message);
                        }
                        console.log(error.config);
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
        console.log(this.props);
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
                                    <SearchMovie
                                        key={index}
                                        id={movie.link}
                                        movie={movie}
                                    />
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
