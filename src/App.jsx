import { Route, Routes } from "react-router"
import { SignInPage } from "./features/admin/page"
import { ProtectedRoute } from "./utilities/protected-route"
import { QUERY_KEY as ARTIST_QUERY_KEY } from "./features/artist"
import { ArtistDashboard } from "./features/artist/pages/artist-dashboard"

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
                <Route
                    path={"/" + ARTIST_QUERY_KEY}
                    element={<ArtistDashboard />}
                />
            </Routes>
        </>
    )
}

export default App
