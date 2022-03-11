import styles from "./UserOptions.module.css";

export default function UserOptions(props) {
  const options = props.options;

  let userNameClasses = styles.user_name;
  let containerClasses = styles.container;
  if (props.nightMode) {
    userNameClasses += ` ${styles.inNigthMode}`;
    containerClasses += ` ${styles.inNigthMode}`;
  } else {
    userNameClasses += ` ${styles.inLigthMode}`;
    containerClasses += ` ${styles.inLigthMode}`;
  }
  if (props.isClickedOutside) {
    containerClasses += ` ${styles.folded}`;
  }
  return (
    <ul
      style={options.length > 0 ? { boxShadow: "#646464 1px 3px 5px 3px"} : {}}
      className={containerClasses}
    >
      {options.map((option) => (
        <li key={option.id}>
          <a
            className={styles.option}
            href={option.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className={userNameClasses}>{option.login}</span>
            <img
              className={styles.user_img}
              src={option.avatar_url}
              alt={`${option.login}`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
