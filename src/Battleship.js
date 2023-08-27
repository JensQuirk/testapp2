import React, {useEffect} from "react";
import './Battleship.css';
import wordflick from './Home.js';

export default function BattleShip() {
    let player1Board = [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0];
    let player2Board = [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0];
    //PlayerShipHits[0] keeps track of player 1's score while PlayerShipHits[1] keeps track of player 2's score.
    let playerShipHits = [0, 0];
    //Resets both player boards.
    const resetBoard = () => {
        playerShipHits = [0, 0];
        for (let i = 0; i < 64; i++){
            document.getElementsByClassName("boardCell")[i].disabled = false;
            document.getElementsByClassName("boardCell")[i+64].disabled = true;
            player2Board[i] = 0;
            player1Board[i] = 0;
            document.getElementsByClassName("boardCell")[i].style.backgroundColor = "black";
            document.getElementsByClassName("boardCell")[i+64].style.backgroundColor = "black";
        }
        document.getElementById("winBox1").style.visibility = "hidden";
        document.getElementById("winBox2").style.visibility = "hidden";
        document.getElementById("winText1").style.visibility = "hidden";
        document.getElementById("winText2").style.visibility = "hidden";
        //
        document.getElementById("player2Board").style.backgroundColor = "darkred"; 
        document.getElementById("player1Board").style.backgroundColor = "darkgreen";
        playerturn = 0;
    }
    //Generates a random board for each player.
    //Ships will be placed randomly in a decending order based on their length(5 - 2).
    //If a ship's random position collides with another one's, it will be assigned a new random position until
    //there is no collision.
    const generateRandomBoard = () => {
        resetBoard();
        for (let x = 0; x < 2; x++) {
            let currentBoard = [];
            let tempBoard = [];
            for (let i = 0; i < 64; i++) {
                currentBoard[i] = 0;
                tempBoard[i] = 0;
            }
            for (let i = 5; i >= 2; i--) {
                let direction = "horizontal";
                let startCell = 0;
                if (Math.floor(Math.random() * 2) == 0) direction = "vertical";
                
                let run = true;
                while (run) {
                    for (let k = 0; k < 64; k++) {
                        tempBoard[k] = 0;
                    }
                    startCell = Math.floor(Math.random() * 64);
                    if ((direction == "horizontal" && 8 - startCell % 8 >= i) ||
                        (direction == "vertical" && startCell + 8 * i < 64)) {
                        run = false;
                        for (let j = 0; j < i; j++){
                            let collision = false;
                            if (direction == "horizontal") {
                                if (currentBoard[startCell + j] == 0) {
                                    tempBoard[startCell + j] = i;
                                }
                                else collision = true;
                            }
                            else if (direction == "vertical") {
                                if (currentBoard[startCell + j * 8] == 0) {

                                    tempBoard[startCell + j * 8] = i;
                                }
                                else collision = true;
                            }
                            if (collision) {
                                console.log("collison " + i);
                                run = true;
                                break;
                            }
                        }
                    }
                }
                for (let j = 0; j < 64; j++){
                    currentBoard[j] += tempBoard[j];
                }
            } 
            console.log(currentBoard);
            if (x == 0) player1Board = currentBoard;
            else if (x == 1) player2Board = currentBoard;
        }
    }

    let playerturn = 1;

    //Checks if the attacked cell on the attacked player's board has a part of a ship on it
    //and takes required action based on result.
    const attackCell = (e) => {
        let cellNumber = parseInt(e.currentTarget.id);
        let currentBoard = [];
        if (e.currentTarget.parentNode.id == "player1Board") currentBoard = player2Board;
        else if (e.currentTarget.parentNode.id == "player2Board") currentBoard = player1Board;
        switch (currentBoard[cellNumber]) {
            case 0:
                e.currentTarget.style.backgroundColor = "red";
                currentBoard[cellNumber] = -1;
                if (playerturn == 0)
                {
                    document.getElementById("player1Board").style.backgroundColor = "darkred"; 
                    document.getElementById("player2Board").style.backgroundColor = "darkgreen";
                    for (let i = 0; i < 64; i++) {
                        document.getElementsByClassName("boardCell")[i].disabled = true;
                        document.getElementsByClassName("boardCell")[i+64].disabled = false;
                    }
                    playerturn = 1;
                }
                else if (playerturn == 1)
                {
                    document.getElementById("player2Board").style.backgroundColor = "darkred"; 
                    document.getElementById("player1Board").style.backgroundColor = "darkgreen";
                    for (let i = 0; i < 64; i++) {
                        document.getElementsByClassName("boardCell")[i].disabled = false;
                        document.getElementsByClassName("boardCell")[i+64].disabled = true;
                    }
                    playerturn = 0;
                }
                break;
            case 2:
                e.currentTarget.style.backgroundColor = "purple";
                playerShipHits[playerturn]++;
                currentBoard[cellNumber] = -1;
                break;
            case 3:
                e.currentTarget.style.backgroundColor = "pink";
                playerShipHits[playerturn]++;
                currentBoard[cellNumber] = -1;
                break;
            case 4:
                e.currentTarget.style.backgroundColor = "yellow";
                playerShipHits[playerturn]++;
                currentBoard[cellNumber] = -1;
                break;
            case 5:
                e.currentTarget.style.backgroundColor = "cyan";
                playerShipHits[playerturn]++;
                currentBoard[cellNumber] = -1;
                break;
            default: ;
        }
        if (e.currentTarget.parentNode.id == "player1Board") player2Board =currentBoard;
        else if (e.currentTarget.parentNode.id == "player2Board") player1Board = currentBoard;

        if (playerShipHits[0] >= 14) {
            console.log("Player 1 wins!");
            for (let i = 0; i < 64; i++) {
                document.getElementsByClassName("boardCell")[i].disabled = true;
                document.getElementsByClassName("boardCell")[i + 64].disabled = true;
                document.getElementById("winBox1").style.visibility = "visible";
                document.getElementById("winText1").style.visibility = "visible";
            }
        }
        if (playerShipHits[1] >= 14) {
            console.log("Player 2 wins!");
            for (let i = 0; i < 64; i++) {
                document.getElementsByClassName("boardCell")[i].disabled = true;
                document.getElementsByClassName("boardCell")[i + 64].disabled = true;
                document.getElementById("winBox2").style.visibility = "visible";
                document.getElementById("winText2").style.visibility = "visible";
            }
        }
    }
    //Called on page load
    useEffect(() => {
        generateRandomBoard();
        clearInterval(wordflick);
        document.getElementById("winBox1").style.visibility = "hidden";
        document.getElementById("winBox2").style.visibility = "hidden";
        document.getElementById("winText1").style.visibility = "hidden";
        document.getElementById("winText2").style.visibility = "hidden";
    })

    return (
        <div className="playSpace">
            <div className="Boards">
                <div className="playerBoardSpace">
                    <li id='player1Board' className="PlayerBoard">
                        <button className="boardCell" onClick={attackCell} id="0"></button>
                        <button className="boardCell" onClick={attackCell} id="1"></button>
                        <button className="boardCell" onClick={attackCell} id="2"></button>
                        <button className="boardCell" onClick={attackCell} id="3"></button>
                        <button className="boardCell" onClick={attackCell} id="4"></button>
                        <button className="boardCell" onClick={attackCell} id="5"></button>
                        <button className="boardCell" onClick={attackCell} id="6"></button>
                        <button className="boardCell" onClick={attackCell} id="7"></button>
                        <button className="boardCell" onClick={attackCell} id="8"></button>
                        <button className="boardCell" onClick={attackCell} id="9"></button>
                        <button className="boardCell" onClick={attackCell} id="10"></button>
                        <button className="boardCell" onClick={attackCell} id="11"></button>
                        <button className="boardCell" onClick={attackCell} id="12"></button>
                        <button className="boardCell" onClick={attackCell} id="13"></button>
                        <button className="boardCell" onClick={attackCell} id="14"></button>
                        <button className="boardCell" onClick={attackCell} id="15"></button>
                        <button className="boardCell" onClick={attackCell} id="16"></button>
                        <button className="boardCell" onClick={attackCell} id="17"></button>
                        <button className="boardCell" onClick={attackCell} id="18"></button>
                        <button className="boardCell" onClick={attackCell} id="19"></button>
                        <button className="boardCell" onClick={attackCell} id="20"></button>
                        <button className="boardCell" onClick={attackCell} id="21"></button>
                        <button className="boardCell" onClick={attackCell} id="22"></button>
                        <button className="boardCell" onClick={attackCell} id="23"></button>
                        <button className="boardCell" onClick={attackCell} id="24"></button>
                        <button className="boardCell" onClick={attackCell} id="25"></button>
                        <button className="boardCell" onClick={attackCell} id="26"></button>
                        <button className="boardCell" onClick={attackCell} id="27"></button>
                        <button className="boardCell" onClick={attackCell} id="28"></button>
                        <button className="boardCell" onClick={attackCell} id="29"></button>
                        <button className="boardCell" onClick={attackCell} id="30"></button>
                        <button className="boardCell" onClick={attackCell} id="31"></button>
                        <button className="boardCell" onClick={attackCell} id="32"></button>
                        <button className="boardCell" onClick={attackCell} id="33"></button>
                        <button className="boardCell" onClick={attackCell} id="34"></button>
                        <button className="boardCell" onClick={attackCell} id="35"></button>
                        <button className="boardCell" onClick={attackCell} id="36"></button>
                        <button className="boardCell" onClick={attackCell} id="37"></button>
                        <button className="boardCell" onClick={attackCell} id="38"></button>
                        <button className="boardCell" onClick={attackCell} id="39"></button>
                        <button className="boardCell" onClick={attackCell} id="40"></button>
                        <button className="boardCell" onClick={attackCell} id="41"></button>
                        <button className="boardCell" onClick={attackCell} id="42"></button>
                        <button className="boardCell" onClick={attackCell} id="43"></button>
                        <button className="boardCell" onClick={attackCell} id="44"></button>
                        <button className="boardCell" onClick={attackCell} id="45"></button>
                        <button className="boardCell" onClick={attackCell} id="46"></button>
                        <button className="boardCell" onClick={attackCell} id="47"></button>
                        <button className="boardCell" onClick={attackCell} id="48"></button>
                        <button className="boardCell" onClick={attackCell} id="49"></button>
                        <button className="boardCell" onClick={attackCell} id="50"></button>
                        <button className="boardCell" onClick={attackCell} id="51"></button>
                        <button className="boardCell" onClick={attackCell} id="52"></button>
                        <button className="boardCell" onClick={attackCell} id="53"></button>
                        <button className="boardCell" onClick={attackCell} id="54"></button>
                        <button className="boardCell" onClick={attackCell} id="55"></button>
                        <button className="boardCell" onClick={attackCell} id="56"></button>
                        <button className="boardCell" onClick={attackCell} id="57"></button>
                        <button className="boardCell" onClick={attackCell} id="58"></button>
                        <button className="boardCell" onClick={attackCell} id="59"></button>
                        <button className="boardCell" onClick={attackCell} id="60"></button>
                        <button className="boardCell" onClick={attackCell} id="61"></button>
                        <button className="boardCell" onClick={attackCell} id="62"></button>
                        <button className="boardCell" onClick={attackCell} id="63"></button>
                    </li>
                    <div className="winTextBox" id='winBox1'>
                        <div className="topBox"></div>
                        <div className="bottomBox"></div>
                    </div>
                    <h3 className="winText" id='winText1'>Player 1 wins!</h3>
                </div>
                <div className="playerBoardSpace">
                    <li id='player2Board' className="PlayerBoard">
                        <button className="boardCell" onClick={attackCell} id="0"></button>
                        <button className="boardCell" onClick={attackCell} id="1"></button>
                        <button className="boardCell" onClick={attackCell} id="2"></button>
                        <button className="boardCell" onClick={attackCell} id="3"></button>
                        <button className="boardCell" onClick={attackCell} id="4"></button>
                        <button className="boardCell" onClick={attackCell} id="5"></button>
                        <button className="boardCell" onClick={attackCell} id="6"></button>
                        <button className="boardCell" onClick={attackCell} id="7"></button>
                        <button className="boardCell" onClick={attackCell} id="8"></button>
                        <button className="boardCell" onClick={attackCell} id="9"></button>
                        <button className="boardCell" onClick={attackCell} id="10"></button>
                        <button className="boardCell" onClick={attackCell} id="11"></button>
                        <button className="boardCell" onClick={attackCell} id="12"></button>
                        <button className="boardCell" onClick={attackCell} id="13"></button>
                        <button className="boardCell" onClick={attackCell} id="14"></button>
                        <button className="boardCell" onClick={attackCell} id="15"></button>
                        <button className="boardCell" onClick={attackCell} id="16"></button>
                        <button className="boardCell" onClick={attackCell} id="17"></button>
                        <button className="boardCell" onClick={attackCell} id="18"></button>
                        <button className="boardCell" onClick={attackCell} id="19"></button>
                        <button className="boardCell" onClick={attackCell} id="20"></button>
                        <button className="boardCell" onClick={attackCell} id="21"></button>
                        <button className="boardCell" onClick={attackCell} id="22"></button>
                        <button className="boardCell" onClick={attackCell} id="23"></button>
                        <button className="boardCell" onClick={attackCell} id="24"></button>
                        <button className="boardCell" onClick={attackCell} id="25"></button>
                        <button className="boardCell" onClick={attackCell} id="26"></button>
                        <button className="boardCell" onClick={attackCell} id="27"></button>
                        <button className="boardCell" onClick={attackCell} id="28"></button>
                        <button className="boardCell" onClick={attackCell} id="29"></button>
                        <button className="boardCell" onClick={attackCell} id="30"></button>
                        <button className="boardCell" onClick={attackCell} id="31"></button>
                        <button className="boardCell" onClick={attackCell} id="32"></button>
                        <button className="boardCell" onClick={attackCell} id="33"></button>
                        <button className="boardCell" onClick={attackCell} id="34"></button>
                        <button className="boardCell" onClick={attackCell} id="35"></button>
                        <button className="boardCell" onClick={attackCell} id="36"></button>
                        <button className="boardCell" onClick={attackCell} id="37"></button>
                        <button className="boardCell" onClick={attackCell} id="38"></button>
                        <button className="boardCell" onClick={attackCell} id="39"></button>
                        <button className="boardCell" onClick={attackCell} id="40"></button>
                        <button className="boardCell" onClick={attackCell} id="41"></button>
                        <button className="boardCell" onClick={attackCell} id="42"></button>
                        <button className="boardCell" onClick={attackCell} id="43"></button>
                        <button className="boardCell" onClick={attackCell} id="44"></button>
                        <button className="boardCell" onClick={attackCell} id="45"></button>
                        <button className="boardCell" onClick={attackCell} id="46"></button>
                        <button className="boardCell" onClick={attackCell} id="47"></button>
                        <button className="boardCell" onClick={attackCell} id="48"></button>
                        <button className="boardCell" onClick={attackCell} id="49"></button>
                        <button className="boardCell" onClick={attackCell} id="50"></button>
                        <button className="boardCell" onClick={attackCell} id="51"></button>
                        <button className="boardCell" onClick={attackCell} id="52"></button>
                        <button className="boardCell" onClick={attackCell} id="53"></button>
                        <button className="boardCell" onClick={attackCell} id="54"></button>
                        <button className="boardCell" onClick={attackCell} id="55"></button>
                        <button className="boardCell" onClick={attackCell} id="56"></button>
                        <button className="boardCell" onClick={attackCell} id="57"></button>
                        <button className="boardCell" onClick={attackCell} id="58"></button>
                        <button className="boardCell" onClick={attackCell} id="59"></button>
                        <button className="boardCell" onClick={attackCell} id="60"></button>
                        <button className="boardCell" onClick={attackCell} id="61"></button>
                        <button className="boardCell" onClick={attackCell} id="62"></button>
                        <button className="boardCell" onClick={attackCell} id="63"></button>
                    </li>
                    <div className="winTextBox" id='winBox2'>
                        <div className="topBox"></div>
                        <div className="bottomBox"></div>
                    </div>
                    <h3 className="winText" id='winText2'>Player 2 wins!</h3>
                </div>
            </div>
            <div className="rules">
                <h3 className="ruleText">Ships to destroy: </h3>
                <div className="ships">
                    <div className="ship5x5">
                        <button /><button /><button /><button /><button />
                    </div>
                    <div className="ship4x4">
                        <button /><button /><button /><button />
                    </div>
                    <div className="ship3x3">
                        <button /><button /><button />
                    </div>
                    <div className="ship2x2">
                        <button /><button />
                    </div>
                </div>
            </div>
            <button className="replayButton" onClick={generateRandomBoard}>Generate new boards</button>
        </div>
    );
}