import React from "react"

export default function Die(props) {
    const spans =[]
    for(let i=0; i<props.value; i++){
        spans.push(<span 
        key= {i}
        className='dot'/>)
    }
    //<h2 className="die-num">{props.value}</h2>
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    var dotClass=""
    if(props.value ==1){
        dotClass = "first--face"
    }
    if(props.value ==2){
        dotClass = "second--face"
    }
    if(props.value ==3){
        dotClass = "third--face"
    }
    if(props.value ==4){
        dotClass = "forth--face"
    }
    if(props.value ==5){
        dotClass = "fifth--face"
    }
    if(props.value ==6){
        dotClass = "sixth--face"
    }
    return (
        <div 
            className= {`dice ${dotClass}`} 
            style={styles}
            onClick={props.holdDice}
        >
        {spans}
        </div>
    )
}