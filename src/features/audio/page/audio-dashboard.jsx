import { NavigationMenu } from "../../../utilities/navigation-menu"
import { AudioTable } from "../components/audio-table"
import { CreateAudioButton } from "../components/create-audio-button"

export function AudioDashboard() {
    return (
        <div className="min-h-screen w-full">
            <div className="flex justify-content-center h-full min-h-screen">
                <div className="card" style={{ minWidth: "50rem" }}>
                    <div className="flex flex-column mx-3 my-2">
                        <NavigationMenu />
                    </div>
                    <div className="flex flex-row justify-content-between m-4">
                        <h2>Audios</h2>
                        <CreateAudioButton />
                    </div>
                    <div className="flex flex-column m-4">
                        <AudioTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
