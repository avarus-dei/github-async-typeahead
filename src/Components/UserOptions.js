import styles from "./UserOptions.module.css";

export default function UserOptions(props) {
  const options = props.options;
  

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <a
          key={option.id}
          className={styles.option}
          href={option.url}
          target="_blank"
          rel="noreferrer"
        >
          <p className={styles.user_name}>{option.login}</p>
          <img className={styles.user_img} src={option.avatar_url} alt={`github-user-#${options.indexOf(option)}`} />
        </a>
      ))}
    </div>
  );
}
