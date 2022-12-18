import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [startTime] = React.useState(performance.now())
    
    const [rolls, setRolls] = React.useState(((localStorage.rolls)&& JSON.parse(localStorage.rolls)) || [])
    
    React.useEffect(()=>{
        localStorage.rolls= JSON.stringify(rolls)     
    },[rolls])
    
    function besScore(array){
        const minString =JSON.parse(localStorage.getItem(array))
        const bestScore= minString[0]
        for(let i=1; i< minString.length ; i++){
            if(minString[i]< bestScore){
                bestScore= minString[i]
            }
        }
        return `Best Score ${bestScore} rolls`
    }
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for(let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    const [rollCount, setRollCount] = React.useState(0)
 
    function rollDice() {
        if(!tenzies) {
            setRollCount(oldCount => oldCount+1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(oldArray => {
                return [...oldArray,rollCount]
            })
           
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
        const [tenzies, setTenzies] = React.useState(false)
        
        var duration=[]

        function time(){
            var time= 
            parseFloat(`${Math.floor(performance.now() - startTime)/1000 }`).toFixed(2) 
            duration.push(time)
            return time
        }
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                { tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies && <p>{`Took ${rollCount} rolls, ${time()} seconds`} 
            </p> }
            {tenzies && <p>{(besScore("rolls"))}</p>}
         </main>
    )
}