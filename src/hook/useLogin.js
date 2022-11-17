import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('api/admin/login', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin" : "*", 
                    "Access-Control-Allow-Credentials" : true
                },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
            // save the admin to local storage
            localStorage.setItem('admin', JSON.stringify(json))
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            
        }
    }

    return { login, isLoading, error }
}