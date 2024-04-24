import { useEffect, useState, useRef } from "react";
import Score from "./Score";
import clickSound from "./Resources/SFX_UI_Button_Mouse_Thick_Generic_2.wav";

const ClickSection = () => {

    const [randomIndex, setRandomIndex] = useState(0);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [score, setScore] = useState(0);

    const clickSectionKeys = [];
    for (let i = 0; i < 9; i++) {
        clickSectionKeys.push(i);
    }

    const audioElement = useRef(new Audio(clickSound));

    const handleClickSectionPart = (key) => {
        setClickedIndex(key);
        console.log(randomIndex, clickedIndex, score);
        if (randomIndex === key) {
            setScore(score + 1);
            const index = Math.floor(Math.random() * 8);
            setRandomIndex(index);
            setClickedIndex(null);
            audioElement.current.play();
        }
        else {
            setScore(score - 1);
        }


    }

    useEffect(() => {
        const enemyInterval = setInterval(() => {
            const index = Math.floor(Math.random() * 8);
            setRandomIndex(index);
            setClickedIndex(null);

        }, 1000);
        return () => {
            clearInterval(enemyInterval);


        }
    }, [score]);

    return (
        <>
            <Score score={score} />
            <div className="clickSection">

                {
                    clickSectionKeys.map((key) => (
                        <div
                            className={`clickSectionPart ${key === randomIndex ? "activeBlock" : ""} ${(clickedIndex === key) ? "clickedBlock" : ""}`}
                            key={key}
                            onClick={() => { handleClickSectionPart(key) }}

                        ></div>
                    ))
                }

            </div>
        </>


    )
}

export default ClickSection;