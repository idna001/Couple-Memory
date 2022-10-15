import "./Celebration.css"

export default function Celebration({highscore, time}){
   return (
    <div className="celebration-container">
        <div className="celebration-notification">
            <p>Highscore achieved: <span>{highscore}</span><br/>Time Taken: <span>{time}s</span></p>
        </div>
    </div>
   ) 
}