import ClickSection from "./ClickSection.js";
import "./Game1.css";
import Instructions from "./Instructions.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenRuler, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from "react";
import clickSound from "./Resources/SFX_UI_Button_Mouse_Thick_Generic_2.wav";

const Game1 = () => {

    const [showInstructions, setShowInstructions] = useState(false);

    const handleInstructionSectionClick = () => {
        setShowInstructions(!showInstructions);
        audioElement.current.play();
    }

    const handleInstructionSectionEnter = () => {
        const icon = document.getElementsByClassName("rulesIcon")[0];
        icon.classList.add("rotateAnimation");
        
    }

    const handleInstructionSectionLeave = () => {
        const icon = document.getElementsByClassName("rulesIcon")[0];
        icon.classList.remove("rotateAnimation");
    }

    const handleUpArrowButtonClick = () => {

        window.history.back();

    }

    const audioElement = useRef(new Audio(clickSound));

    return(
        <div className="wrapper">
            
            <div className="instructionSection"
                onClick={ () => handleInstructionSectionClick() }
                onMouseEnter={ () => handleInstructionSectionEnter() }
                onMouseLeave={ () => handleInstructionSectionLeave() }
            >
                <FontAwesomeIcon icon={faPenRuler} className="rulesIcon" />  
                <div className="instructionText">INSTRUCTIONS</div>
            </div>
            { showInstructions && <Instructions /> }
            { !showInstructions && <ClickSection />}

            <FontAwesomeIcon 
                className="uparrowIcon" 
                icon={faArrowUp} 
                onClick={() => { handleUpArrowButtonClick() }}/>
        </div>
    )
}

export default Game1;
