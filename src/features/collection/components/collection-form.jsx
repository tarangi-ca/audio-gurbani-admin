import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useState } from "react"
import { useCreateCollection } from "../hooks/use-create-collection"
import { QUERY_KEY } from ".."
import { useQueryClient } from "@tanstack/react-query"

export function CreateCollectionForm() {
    const [displayName, setDisplayName] = useState("")
    const [slug, setSlug] = useState("")
    const [artistId, setArtistId] = useState("")

    const { mutate: createCollection, isLoading, error } = useCreateCollection()
    const client = useQueryClient()

    const onSubmit = (event) => {
        event.preventDefault()

        createCollection(
            { displayName, slug, artistId },
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
                <label htmlFor="artistId">Artist ID</label>
                <InputText
                    id="artistId"
                    value={artistId}
                    onChange={(event) => setArtistId(event.target.value)}
                    disabled={isLoading}
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
