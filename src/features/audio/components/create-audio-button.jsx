import { useState } from "react"
import { Button } from "primereact/button"
import { CreateAudioDialog } from "./create-audio-dialog"

export function CreateAudioButton() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button
                text
                icon="pi pi-plus"
                size="small"
                onClick={() => setVisible(true)}
            />
            <CreateAudioDialog visible={visible} setVisible={setVisible} />
        </>
    )
}
