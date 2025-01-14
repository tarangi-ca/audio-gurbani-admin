import { Route, Routes } from "react-router"
import { SignInPage } from "./features/admin/page"
import { ProtectedRoute } from "./utilities/protected-route"
import { QUERY_KEY as ARTIST_QUERY_KEY } from "./features/artist"
import { ArtistDashboard } from "./features/artist/pages/artist-dashboard"
import { CollectionDashboard } from "./features/collection/pages/collection-dashboard"
import { QUERY_KEY as COLLECTION_QUERY_KEY } from "./features/collection"
import { AudioDashboard } from "./features/audio/page/audio-dashboard"
import { QUERY_KEY as AUDIO_QUERY_KEY } from "./features/audio"

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
                <Route
                    path={"/" + COLLECTION_QUERY_KEY}
                    element={<CollectionDashboard />}
                />
                <Route
                    path={"/" + AUDIO_QUERY_KEY}
                    element={<AudioDashboard />}
                />
            </Routes>
        </>
    )
}

export default App
