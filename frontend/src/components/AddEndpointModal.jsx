import Button from "./Button"
import Header from "./Header"
import Input from "./Input"
import { useContext, useState } from "react";
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import { addEndpoint } from "../services/endpointService";
import { useNavigate } from "react-router";

export default function AddEndpointModal() {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [endpointName, setEndpointName] = useState("")
    const [endpointUrl, setEndpointUrl] = useState("")
    let navigate = useNavigate();
    console.log(user)

    const onCreateClick = async () => {
        setLoading(true);
        try {
            const response = await addEndpoint(endpointName, endpointUrl)
            console.log(response.data)

            toast.success(`${endpointName} creation success!`)
        } catch(error) {
            toast.error(`Endpoint creation failed.`);
        }
        finally {
            navigate("/dashboard");
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-grow flex-col justify-center items-center gap-5">
            <Header className="text-white text-xl">Add Endpoint</Header>
            <p className="text-white">Name</p>
            <Input 
                className="max-w-sm"
                onChange={(e) => setEndpointName(e.target.value)}
            >
            </Input>

            <p className="text-white">Link</p>
            <Input 
                className="max-w-sm"
                onChange={(e) => setEndpointUrl(e.target.value)}
            >
            </Input>

            <Button onClick={onCreateClick} disabled={loading} className="bg-white/10 text-white">Create</Button>
        </div>
    )
}