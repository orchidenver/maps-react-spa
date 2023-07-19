import styles from "../styles/Logo.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}
