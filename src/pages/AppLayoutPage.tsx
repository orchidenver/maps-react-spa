import Sidebar from "../components/SIdebar";
import Map from "../components/Map";

import styles from "../styles/AppLayout.module.css";

export default function AppLayoutPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
