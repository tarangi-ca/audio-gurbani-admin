import { ArtistTable } from "../components/artist-table"
import { CreateArtistButton } from "../components/create-artist-button"

export function ArtistDashboard() {
    return (
        <div className="min-h-screen w-full">
            <div className="flex justify-content-center h-full min-h-screen">
                <div className="card">
                    <div className="flex flex-row justify-content-between m-4">
                        <h2>Artists</h2>
                        <CreateArtistButton />
                    </div>
                    <div className="flex flex-column m-4">
                        <ArtistTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
