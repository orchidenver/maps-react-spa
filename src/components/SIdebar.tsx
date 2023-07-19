import * as React from "react";
import styles from "../styles/Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyrigths {new Date().getFullYear()} WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
