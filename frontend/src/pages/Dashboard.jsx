import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Analytics from "../components/Analytics";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import AddEndpointModal from "../components/AddEndpointModal";

const Dashboard = () => {
    const { user, setUser } = useContext(UserContext);
    const [onAddEndpoint, setOnAddEndpoint] = useState(false)

    const onAddButtonClick = () => {
        setOnAddEndpoint(true);
    }

    return (
        <div className="font-mono min-h-screen bg-gradient-to-br from-emerald-700 to-violet-700 flex flex-col p-4 gap-5">

            <Navbar></Navbar>

            {!onAddEndpoint
                ? <div className="flex flex-grow flex-col justify-center items-center gap-2">
                    <Analytics></Analytics>
                    <Button onClick={onAddButtonClick}>Add New Endpoint</Button>
                </div>
                : <AddEndpointModal></AddEndpointModal>
            }

            <div className="text-center bottom-6 text-white text-xs">
                © 2025 APIShield - Created by Onni Luova
            </div>
        </div>
    );
}

export default Dashboard;