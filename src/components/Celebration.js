import "./Celebration.css"

export default function Celebration({highScore, elapsedTime}){
   return (
    <div className="celebration-container">
        <div className="celebration-notification">
            <p>Highscore achieved: <span>{highScore}</span><br/>Time Taken: <span>{elapsedTime}s</span></p>
        </div>
    </div>
   ) 
}