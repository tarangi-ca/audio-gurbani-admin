import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useState } from "react"
import { useCreateAudio } from "../hooks/use-create-audio"
import { QUERY_KEY } from ".."
import { useQueryClient } from "@tanstack/react-query"
import { FileUpload } from "primereact/fileupload"

export function CreateAudioForm() {
    const [displayName, setDisplayName] = useState("")
    const [collectionId, setCollectionId] = useState("")
    const [file, setSelectedFile] = useState(null)

    const { mutate: createAudio, isLoading, error } = useCreateAudio()
    const client = useQueryClient()

    const onSubmit = (event) => {
        event.preventDefault()

        if (file) {
            createAudio(
                { file, displayName, collectionId },
                {
                    onSuccess: () =>
                        client.invalidateQueries({ queryKey: [QUERY_KEY] }),
                }
            )
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-column gap-3 m-4">
            <div className="flex flex-column gap-3">
                <label htmlFor="displayName">Display Name</label>
                <InputText
                    id="displayName"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-column gap-3">
                <label htmlFor="slug">Collection ID</label>
                <InputText
                    id="collectionId"
                    value={collectionId}
                    onChange={(event) => setCollectionId(event.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-column gap-3">
                <label>File</label>
                <FileUpload
                    mode="basic"
                    accept="audio/*"
                    maxFileSize={10000000} // 10MB max file size
                    chooseLabel="Choose Audio File"
                    className="w-full"
                    auto={false}
                    customUpload
                    disabled={isLoading}
                    onSelect={(event) => setSelectedFile(event.files[0])}
                />
            </div>
            <div className="flex flex-column gap-3">
                <Button
                    label="Submit"
                    icon="pi pi-check"
                    disabled={isLoading}
                />
            </div>
            {error && (
                <div className="text-red-500">
                    {error.response?.data?.message || error.message}
                </div>
            )}
        </form>
    )
}
