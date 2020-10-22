import React, { Component } from "react";
import ReactPlayer from "react-player";
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
        };
    }
    render() {
        const { url } = this.state;
        console.log(url);
        if (url === undefined) {
            return null;
        } else {
            if (url === "none") {
                return null;
            } else {
                // console.log(url);

                const videoURL = `https://www.youtube.com/watch?v=${url}`;
                return (
                    <div className="trailer__wrap">
                        <ReactPlayer
                            url={videoURL}
                            width="480px"
                            height="320px"
                            controls
                        />
                        <h1>&lt; T R A I L E R &gt;</h1>
                    </div>
                );
            }
        }
    }
}

export default Player;
