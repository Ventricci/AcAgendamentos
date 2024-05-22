"use client";
import { useSession } from "next-auth/react";

import styles from "../page.module.css";
import Scheduler from "@/components/scheduler/scheduler";
export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <main className={styles.main}>
      <Scheduler />
    </main>
  );
}
