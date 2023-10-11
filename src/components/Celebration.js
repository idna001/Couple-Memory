import "./Celebration.css";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ShareButton from "./ShareButton";
export default function Celebration({ highScore, elapsedTime }) {




    const highScoreRef = useRef(null);


    return (
            <div className="celebration-container">
                <div className="celebration-notification">
                    {/* <p ref={highScoreRef}> Highscore achieved: <span>{highscore}</span><br/>Time Taken: </p> */}
                    <p ref={highScoreRef}>
                       Highscore achieved: <span>{highScore}</span>
                        <br />
                    </p>
                    {/* <p><span>{time}s</span></p> */}
    {/*
                        <button onClick={handleScreenshot}>Share highscore</button>
    */}
                    <div className="button">
{/*
                        <button onClick={handleScreenshot}>{buttonText}</button>
*/}
                        <ShareButton highScore={highScore}
                                     highScoreRef={highScoreRef}
                        />
                    </div>
                </div>
            </div>
        );
>>>>>>> Stashed changes
}
