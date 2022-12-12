import React from "react";
import AdminDashboardLayout from "../components/AdminDashboardLayout";
import Settings from "../components/Settings";
import JobForm from "../components/JobForm";
import MyJobs from "../components/MyJobs";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { User } from '@supabase/supabase-js';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const menuOptions = ["Create Job", "My Jobs", "Settings"]

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

const AdminPage = ({ user }: { user: User }) => {
    const [activeWindow, setActiveWindow] = useState("Create Job")

  return (
    <AdminDashboardLayout menuOptions={menuOptions} setActiveWindow={setActiveWindow}>
        <main className={styles.main}>
            <Container >
              {activeWindow === "Create Job" && <JobForm/>}
              {activeWindow === "Settings" && <Settings user={user}/>}
              {activeWindow === "My Jobs" && <MyJobs/>}
            </Container>
        </main>
    </AdminDashboardLayout>
  );
};

export default AdminPage;