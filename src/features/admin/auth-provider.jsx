import { useState } from "react"
import PropTypes from "prop-types"
import { AuthContext } from "./use-auth-context"

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)

    const signIn = (token) => {
        if (token) {
            try {
                setToken(token)
                localStorage.setItem("token", token)
            } catch (error) {
                console.error("Error decoding token:", error)
                signOut()
            }
        }
    }

    const signOut = () => {
        setToken(null)
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={(token, signIn, signOut)}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
