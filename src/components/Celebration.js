import "./Celebration.css"

export default function Celebration({highscore}){
   return (
    <div className="celebration-container">
        <div className="celebration-notification">
            <p>Highscore achieved: <span>{highscore}</span></p>
        </div>
    </div>
   ) 
}