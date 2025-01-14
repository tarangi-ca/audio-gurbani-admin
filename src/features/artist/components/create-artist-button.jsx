import { useState } from "react"
import { Button } from "primereact/button"
import { CreateArtistDialog } from "./create-artist-dialog"

export function CreateArtistButton() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button
                text
                icon="pi pi-plus"
                size="small"
                onClick={() => setVisible(true)}
            />
            <CreateArtistDialog visible={visible} setVisible={setVisible} />
        </>
    )
}
