import { useEffect } from "react";

export default function Instructions() {

    useEffect(() => {
        var rules = document.getElementsByClassName("rule");
        const ruleTextArray = [
            "There are 9 boxes/squares in the game.",
            "Every x seconds a box turns aqua for x seconds randomly out of the 9 boxes/squares.",
            "If the player manages to click the aqua - coloured box/square within x seconds, player's score is increased by 1 point.",
            "If the player fails to click the aqua - coloured box/square within x seconds, player takes a penalty of 1 point"
        ]
        function textTypeEffect(element, text, i = 0) {
            if (i == 0) element.textContent = "";
            element.textContent += text[i];
            if (i < text.length - 1)
                setTimeout(() => { textTypeEffect(element, text, i + 1)}, 50);
            else return "";
        }

        for (let i = 0; i < rules.length; i++)
            textTypeEffect(rules[i], ruleTextArray[i]);

        console.log(rules);

    }, []);

    return(
        <>
            <div className="instructions">
                <h1>INSTRUCTIONS:</h1>
                
                <ul>
                    <li className="rule"></li>
                    <li className="rule"></li>
                    <li className="rule"></li>
                    <li className="rule"></li>
                </ul>
                
            </div>
        </>
    )

}