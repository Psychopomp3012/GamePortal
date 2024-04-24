
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Home.module.css";

const ContactInfo = () => {

    const onClickingLinkedIn = () => {
        window.location.href = "";
    }

    const onClickingGitHub = () => {
        window.location.href = "https://github.com/Psychopomp3012"
    }

    return (
        <div className={ styles.contactInfo }>  

            <p className={ styles.contactText }>Feel free to Reach out!!:</p>
            <div className={ styles.contactInfoSection }>
                <div 
                    className="contactInfoSection1"
                    onClick={ () => onClickingLinkedIn() }>
                    <FontAwesomeIcon className={ styles.icon } icon={faLinkedin} />
                    <p className={ styles.someText }>@SACHIN_DIWAKAR</p>
                </div>
                <div 
                    className="contactInfoSection2"
                    onClick={ () => onClickingGitHub() }>
                    <FontAwesomeIcon className={ styles.icon } icon={faSquareGithub} />
                    <p className={ styles.someText }>@Psychopomp3012</p>
                </div>
            </div>
            
        </div>
    )
}

export default ContactInfo;