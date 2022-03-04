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

  return (
    <div className={containerClasses}>
      {options.map((option) => (
        <a
          key={option.id}
          className={styles.option}
          href={option.url}
          target="_blank"
          rel="noreferrer"
        >
          <p className={userNameClasses}>{option.login}</p>
          <img
            className={styles.user_img}
            src={option.avatar_url}
            alt={`${option.login}`}
          />
        </a>
      ))}
    </div>
  );
}
