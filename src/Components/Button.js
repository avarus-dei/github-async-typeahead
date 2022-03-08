import styles from './Button.module.css';

export default function Button(props) {
  let buttonClasses = styles.button;
  if(props.nightMode){
    buttonClasses += ` ${styles.inNigthMode}`
  }else{
    buttonClasses += ` ${styles.inLigthMode}`
  }
  
  return <button className={buttonClasses} onClick={props.swichModes}></button>;
}
