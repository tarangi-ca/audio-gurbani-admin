import { NavigationMenu } from "../../../utilities/navigation-menu"
import { CollectionTable } from "../components/collection-table"
import { CreateCollectionButton } from "../components/create-collection-button"

export function CollectionDashboard() {
    return (
        <div className="min-h-screen w-full">
            <div className="flex justify-content-center h-full min-h-screen">
                <div className="card" style={{ minWidth: "50rem" }}>
                    <div className="flex flex-column mx-3 my-2">
                        <NavigationMenu />
                    </div>
                    <div className="flex flex-row justify-content-between m-4">
                        <h2>Collections</h2>
                        <CreateCollectionButton />
                    </div>
                    <div className="flex flex-column m-4">
                        <CollectionTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
