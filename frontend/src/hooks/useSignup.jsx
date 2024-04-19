import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (userName, email, contact, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = {userName, email, contact, password};

            const response = await fetch('http://localhost:5000/api/user/signup', {
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
            }

            console.log(error)

            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false)
        } catch (error) {
            setError(error);
        }
    }

    return {signup, isLoading, error}
}