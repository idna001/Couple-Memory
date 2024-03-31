import "./Celebration.css";
import React, { useRef } from "react";
import ShareButton from "./ShareButton";
export default function Celebration({ highScore, elapsedTime }) {
    const highScoreRef = useRef(null);
    return (
            <div className="celebration-container">
                <div className="celebration-notification">
                    <p ref={highScoreRef}>
                       Highscore achieved: <span>{highScore}</span>
                        <br />
                    </p>
                    { <p><span>{elapsedTime}s</span></p>}
                    <div className="button">
                        <ShareButton highScore={highScore}
                                     highScoreRef={highScoreRef}
                        />
                    </div>
                </div>
            </div>
        );
}
