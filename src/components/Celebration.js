import "./Celebration.css";
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function Celebration({highscore, time}){
    const highScoreRef = useRef(null);

  const takeScreenshot = () => {
    if (!highScoreRef.current) {
      console.error("Element not found.");
      return;
    }

    html2canvas(highScoreRef.current, { useCORS: true , backgroundColor:"black"}).then((canvas) => {
      const image = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = image;
      a.download = "high_score_screenshot.jpeg";
      a.click();
    }).catch((error) => {
      console.error("Error capturing screenshot:", error);
    });
  };
   return (
    <div className="celebration-container" >
        <div className="celebration-notification" >
            <p ref={highScoreRef}> <h3>A&A Match</h3>Highscore achieved: <span>{highscore}</span><br/>Time Taken: <span>{time}s</span></p>
            <div className="button">
                <button onClick={takeScreenshot}>Take Screenshot</button>
            </div>
        </div>
    </div>
   ) 
}