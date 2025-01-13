import { Navigate } from "react-router"
import { useAuth } from "../features/admin/use-auth-context"
import PropTypes from "prop-types"
import { useEffect } from "react"

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth()

    useEffect(() => {
        console.log(token)
    }, [token])

    return token ? children : <Navigate to="/sign-in" />
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
