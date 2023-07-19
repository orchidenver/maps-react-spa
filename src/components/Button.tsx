import styles from "../styles/Button.module.css";
import { ButtonProps } from "../types";

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
