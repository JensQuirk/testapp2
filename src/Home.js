import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import './Home.css'



export default function Home() {
    
    var words = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra interdum mauris. Suspendisse consectetur accumsan dignissim. Ut sit amet felis quis erat dictum hendrerit ac molestie nisl.',
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;

    useEffect(() => {
        //Animation taken from https://codepen.io/alvarotrigo/pen/ZEJgqLN. Posted by https://codepen.io/alvarotrigo.
        const wordflick =  
            setInterval(() => {
                if (forwards) {
                    if (offset >= words.length) {
                        ++skip_count;
                        if (skip_count == skip_delay) {
                        forwards = false;
                        skip_count = 0;
                        }
                    }
                }
                else {
                    if (offset == 0) {
                        forwards = true;
                        i++;
                        offset = 0;
                        if (i >= len) {
                        i = 0;
                        }
                    }
                }
                part = words.substr(0, offset);
                if (skip_count == 0) {
                    if (forwards) {
                        offset++;
                    }
                else {
                    offset--;
                }
                }
                document.getElementById("textAnimate").innerHTML = part;
        },speed);
        return () => clearInterval(wordflick);
    })
    return (
        <>  
            <div className="topText">
                <h1>Home</h1>
            </div>
            <div className="content">
                <div className="contentContainer">
                    <h2>Play BattleShip!</h2>
                    <p>Click&nbsp;
                        <Link to='/battleship'>here</Link>
                        &nbsp;to play BattleShip.<br/>2 players take turns trying to sink each other's ships. 
                    </p>
                </div>
                <div className="contentContainer" id='animatedContainer'>
                    <h2 id='titleAnimate'>This text is animated</h2>
                    <p id='textAnimate'></p>
                </div>
                {/* <div className="contentContainer"></div>
                <div className="contentContainer"></div>
                <div className="contentContainer"></div> */}
            </div>
        </>
    );
}