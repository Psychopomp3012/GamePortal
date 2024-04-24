import { Outlet, Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect, useRef } from "react";
import ContactInfo from "./ContactInfo";
import game1Music from "../components/Game1/Resources/Pink Panther.mp3";

const Layout = () => {

  useEffect(() => {
    function textTypeEffect(element, text, i = 0) {
      if (i == 0) element.textContent = "";
      element.textContent += text[i];
      if (i < text.length - 1)
          setTimeout(() => { textTypeEffect(element, text, i + 1)}, 50);
      else return "";
    }
    var textArray = [
      "Welcome to Psychopomp3012's Game Portal",
      "Hope you are having fun!!!",
      "Had a bad day? Let's play BIRD-TAP-GAME",
      "Ready to beat your high score? Dive into our exciting games now!",
      "Master the art of strategy with our Rock-Paper-Scissor showdown!",
      "SECRET: I am planning on creating a BackEnd for the Scores"
    ];
    var element = document.getElementsByClassName("portalHeading")[0];
    
    // console.log(randomIndex);

    function repeat() {
      let randomIndex = Math.round(Math.random() * (textArray.length - 1));
      textTypeEffect(element, textArray[randomIndex])
    }
    setTimeout(repeat, 0);
    setInterval(repeat, 5000);
  }, []);

  useEffect(() => {
    const circle = document.getElementById("circle");
        const mouse = {x:0, y:0};
        const previousMouse = {x:0, y:0};
        const circlePosition = {x:0, y:0};
        const speed = 0.12;
        let currentScale = 0;
        let currentAngle = 0;

        window.addEventListener("mousemove", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        const tick = () => {
            circlePosition.x += (mouse.x - circlePosition.x) * speed;
            circlePosition.y += (mouse.y - circlePosition.y);

            const translateTransform = `translate(${circlePosition.x}px, ${circlePosition.y}px)`;

            // distance between mouse and previousMouse

            const deltaMouseX = mouse.x - previousMouse.x;
            const deltaMouseY = mouse.y - previousMouse.y;

            previousMouse.x = mouse.x;
            previousMouse.y = mouse.y;

            const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);  // To keep the output value within a reasonable range
            const scaleValue = (mouseVelocity / 150) * 0.5;

            currentScale += (scaleValue - currentScale) * speed;

            const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

            const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

            if (mouseVelocity > 20) {
                currentAngle = angle;
            }

            const rotateTransform = `rotate(${angle}deg)`;

            circle.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

            window.requestAnimationFrame(tick);
        }

        tick();
  }, []);

  const handleBoxGameButtonClick = () => {

    
    bgm.current.play();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });

  };

  const bgm = useRef(new Audio(game1Music));

  return (
    <div className={ styles.wrapper }>

      <div className={ `portalHeading ${ styles.portalHeading }` }></div>
      
      <div className={ styles.circle } id="circle"></div>
      <nav>
        <ul>
          <li>
            
            <Link to="/"></Link>
          </li>
          <li>
            <Link to="/rps"><button className={ styles.button }><span className="span1">Rock-Paper-Scissor</span></button></Link>
          </li>
          <li>
            <Link to="/bcg"><button className={ styles.button }><span className="span1">Box-Collecting-Game</span></button></Link>
          </li>
          <li>
            <Link to="/clickBox"
            onClick={ () => handleBoxGameButtonClick() }
            ><button className={ styles.button }><span className="span1">Click-Box-Game</span></button></Link>
          </li>
          <li>
            <a href="https://psychopomp3012.github.io/VanillaJSGames/Game1/fifth.html" target="_blank" rel="noopener noreferrer">
                <button className={styles.button}><span className="span1">Bird-Tap-Game</span></button>
            </a>

          </li>
          <li>
            <a href="https://psychopomp3012.github.io/VanillaJSGames/Game2/seventh.html" target="_blank" rel="noopener noreferrer">
                <button className={styles.button}><span className="span1">Wolf-Runner-Game</span></button>
            </a>
          </li>
          <li>
            <ContactInfo />
          </li>
        </ul>
        
      </nav>

      

      <Outlet />

      
      
    </div>
  )
};

export default Layout;