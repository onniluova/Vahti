import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import Header from "../components/Header"
import Navbar from "../components/Navbar"

const Settings = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="font-mono min-h-screen bg-gradient-to-br from-emerald-700 to-violet-700 flex items-center justify-center p-4">
            
            <div className="max-w-md">
                <Navbar>
                </Navbar>
            </div>
            
            <div className='flex flex-row items-center justify-center'>
                <Header>Settings</Header>
                <Header>{user.username}</Header>
            </div>
        </div>
    )
}

export default Settings;