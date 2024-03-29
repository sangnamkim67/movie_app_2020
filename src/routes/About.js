import React from "react";
import "./About.css";

function About(props) {
    console.log(props);
    return (
        <div className="about__container">
            <span>
                “Freedom is the freedom to say that two plus two make four. If
                that is granted, all else follows.”
            </span>
            <span>− George Orwell, 1984</span>
            <br />
            <br />
            <span>
                <span role="img" aria-label="movie">
                    🎬 NomadCoder : React로 영화 웹서비스 🎬 ✍ CLONE CODING
                </span>
            </span>
            <ul>
                <li>영화 리스트 출력</li>
                <li>영화 상세 정보</li>
                <li>영화 검색 기능</li>
            </ul>
        </div>
    );
}

export default About;
