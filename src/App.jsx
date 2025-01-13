import { Route, Routes } from "react-router"
import { SignInPage } from "./features/admin/page"
import { ProtectedRoute } from "./utilities/protected-route"

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <h1>Hello from Protected Route</h1>
                        </ProtectedRoute>
                    }
                />
                <Route path="/sign-in" element={<SignInPage />} />
            </Routes>
        </>
    )
}

export default App
