'use client';

import styles from "./page.module.css";
import SignIn from "../components/signIn/signIn";

export default function Home() {
  return (
    <main className={styles.main}>
      <SignIn />
    </main>
  );
}
