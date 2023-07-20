import Sidebar from "../components/SIdebar";
import Map from "../components/Map";
import User from "../components/User";

import styles from "../styles/AppLayout.module.css";

export default function AppLayoutPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
