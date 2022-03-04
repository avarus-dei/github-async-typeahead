import styles from './Button.module.css';

export default function Button(props) {

  
  return <button onClick={props.swichModes}>{props.currentMode}</button>;
}
