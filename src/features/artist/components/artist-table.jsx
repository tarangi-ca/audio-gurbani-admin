import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import { Button } from "primereact/button"
import { useListArtists } from "../hooks/use-get-artists"
import PropTypes from "prop-types"
import { useDeleteArtist } from "../hooks/use-delete-artist"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from ".."
import { useFileDetail } from "../../file/hooks/use-get-file"
import { Avatar } from "primereact/avatar"

function ArtistColumn({ field, header, isLoading, body = undefined }) {
    return (
        <Column
            field={field}
            header={header}
            body={isLoading ? <Skeleton /> : body}
        />
    )
}

ArtistColumn.propTypes = {
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    body: PropTypes.func,
}

function DeleteBodyTemplate({ id }) {
    const client = useQueryClient()
    const { mutate: deleteArtist, isLoading: isLoading } = useDeleteArtist()

    const onDelete = (event) => {
        event.preventDefault()

        deleteArtist(
            { id },
            {
                onSuccess: () =>
                    client.invalidateQueries({ queryKey: [QUERY_KEY] }),
            }
        )
    }

    return (
        <Button
            icon="pi pi-trash"
            text
            severity="danger"
            size="small"
            disabled={isLoading}
            onClick={onDelete}
        />
    )
}

DeleteBodyTemplate.propTypes = {
    id: PropTypes.string.isRequired,
}

function ImageBodyTemplate({ id, displayName }) {
    const { data: image, isLoading } = useFileDetail("images", id)

    if (isLoading) {
        return <Skeleton shape="circle" size="4rem" />
    }

    return (
        <Avatar
            image={image}
            imageAlt={displayName}
            alt={displayName}
            size="xlarge"
            shape="circle"
        />
    )
}

ImageBodyTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
}

const formatDateTime = (value) => {
    if (!value) return ""
    return new Date(value).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}

export function ArtistTable() {
    const { data: artists, isLoading } = useListArtists()

    return (
        <DataTable
            value={
                isLoading
                    ? Array.from({ length: 5 }, (v, i) => i)
                    : artists.data
            }
        >
            <Column
                header="Cover Image"
                body={ImageBodyTemplate}
                exportable={false}
            />
            <ArtistColumn field="id" header="ID" isLoading={isLoading} />
            <ArtistColumn
                field="displayName"
                header="Display Name"
                isLoading={isLoading}
            />
            <ArtistColumn field="slug" header="Slug" isLoading={isLoading} />
            <ArtistColumn
                field="createdAt"
                header="Created At"
                isLoading={isLoading}
                body={({ createdAt }) => formatDateTime(createdAt)}
            />
            <ArtistColumn
                field="updatedAt"
                header="Updated At"
                isLoading={isLoading}
                body={({ updatedAt }) => formatDateTime(updatedAt)}
            />
            <Column body={DeleteBodyTemplate} exportable={false} />
        </DataTable>
    )
}
