import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { FileUpload } from "primereact/fileupload"
import { useState } from "react"
import { useCreateArtist } from "../hooks/use-create-artist"
import { QUERY_KEY } from ".."
import { useQueryClient } from "@tanstack/react-query"
import { InputTextarea } from "primereact/inputtextarea"

export function CreateArtistForm() {
    const [displayName, setDisplayName] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [file, setSelectedFile] = useState(null)

    const { mutate: createArtist, isLoading, error } = useCreateArtist()
    const client = useQueryClient()

    const onSubmit = (event) => {
        event.preventDefault()

        createArtist(
            { file, displayName, slug, description },
            {
                onSuccess: () =>
                    client.invalidateQueries({ queryKey: [QUERY_KEY] }),
            }
        )
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
                <label htmlFor="slug">Slug</label>
                <InputText
                    id="slug"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-column gap-3">
                <label htmlFor="description">Description</label>
                <InputTextarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-column gap-3">
                <label htmlFor="file">Cover Image</label>
                <FileUpload
                    id="file"
                    mode="basic"
                    accept="image/*"
                    maxFileSize={10000000} // 10MB max file size
                    chooseLabel="Choose Cover Photo"
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
