import "./Celebration.css";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
<<<<<<< Updated upstream

export default function Celebration({ highscore, time }) {
  const highScoreRef = useRef(null);
  const [buttonText, setButtonText] = useState("Take Screenshot");
  const [screenshotImage, setScreenshotImage] = useState(null);

  const handleScreenshot = () => {
    if (buttonText === "Take Screenshot") {
      if (!highScoreRef.current) {
        console.error("Element not found.");
        return;
      }

      html2canvas(highScoreRef.current, {
        useCORS: true,
        backgroundColor: "black",
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          setScreenshotImage(image); 
          setButtonText("Share Screenshot");
          const a = document.createElement("a");
          a.href = image;
          a.download = "high_score_screenshot.jpeg";
          a.click();
        })
        .catch((error) => {
          console.error("Error capturing screenshot:", error);
        });
    } else {
      handleShare();
    }
  };

  const handleShare = () => {
    if (navigator.share && screenshotImage) {
      navigator
        .share({
          title: "High Score Screenshot",
          text: `I achieved a high score of ${highscore} in A&A Match!`,
          url: screenshotImage,
        })
        .then(() => {
          console.log("Share successful");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      if (!navigator.share) {
        alert("Sharing is not supported on this device/browser.");
      } else {
        alert("the screenshot image is not available");
      }
    }
  };

  return (
    <div className="celebration-container">
      <div className="celebration-notification">
        {/* <p ref={highScoreRef}> Highscore achieved: <span>{highscore}</span><br/>Time Taken: </p> */}
        <p ref={highScoreRef}>
          <h3>A&A Match</h3>Highscore achieved: <span>{highscore}</span>
          <br />
        </p>
        {/* <p><span>{time}s</span></p> */}
        <div className="button">
          <button onClick={handleScreenshot}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
=======
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
