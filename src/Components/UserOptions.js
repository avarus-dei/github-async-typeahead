import styles from './UserOptions.module.css';

export default function UserOptions(props) {
  let options = [];
  if (typeof props.options === "object") {
    options = props.options;
  }

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <p>{option.login}</p>
      ))}
    </div>
  );
}
