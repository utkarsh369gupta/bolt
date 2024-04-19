import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const navigate = useNavigate();

    const login = async (contact, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = {contact, password};

            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                navigate('/');
            }

            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false)
        } catch (error) {
            setError(error);
        }
    }

    return {login, isLoading, error}
}