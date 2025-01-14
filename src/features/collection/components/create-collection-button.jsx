import { useState } from "react"
import { Button } from "primereact/button"
import { CreateCollectionDialog } from "./create-collection-dialog"

export function CreateCollectionButton() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button
                text
                icon="pi pi-plus"
                size="small"
                onClick={() => setVisible(true)}
            />
            <CreateCollectionDialog visible={visible} setVisible={setVisible} />
        </>
    )
}
