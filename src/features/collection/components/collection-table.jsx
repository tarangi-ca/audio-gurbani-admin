import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import { Button } from "primereact/button"
import { useListCollections } from "../hooks/use-get-collections"
import PropTypes from "prop-types"
import { useDeleteCollection } from "../hooks/use-delete-collection"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from ".."
import { Avatar } from "primereact/avatar"
import { useFileDetail } from "../../file/hooks/use-get-file"

function CollectionColumn({ field, header, isLoading }) {
    return (
        <Column
            field={field}
            header={header}
            body={isLoading ? <Skeleton /> : undefined}
        />
    )
}

CollectionColumn.propTypes = {
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

function DeleteBodyTemplate({ id }) {
    const client = useQueryClient()
    const { mutate: deleteCollection, isLoading: isLoading } =
        useDeleteCollection()

    const onDelete = (event) => {
        event.preventDefault()

        deleteCollection(
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
        return <Skeleton size="4rem" />
    }

    return (
        <Avatar
            image={image}
            imageAlt={displayName}
            alt={displayName}
            size="xlarge"
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

export function CollectionTable() {
    const { data: collections, isLoading } = useListCollections()

    return (
        <DataTable
            value={
                isLoading
                    ? Array.from({ length: 5 }, (v, i) => i)
                    : collections.data
            }
        >
            <Column
                header="Cover Image"
                body={ImageBodyTemplate}
                exportable={false}
            />
            <CollectionColumn field="id" header="ID" isLoading={isLoading} />
            <CollectionColumn
                field="displayName"
                header="Display Name"
                isLoading={isLoading}
            />
            <CollectionColumn
                field="slug"
                header="Slug"
                isLoading={isLoading}
            />
            <CollectionColumn
                field="artistId"
                header="Artist Id"
                isLoading={isLoading}
            />
            <CollectionTable
                field="createdAt"
                header="Created At"
                isLoading={isLoading}
                body={({ createdAt }) => formatDateTime(createdAt)}
            />
            <CollectionTable
                field="updatedAt"
                header="Updated At"
                isLoading={isLoading}
                body={({ updatedAt }) => formatDateTime(updatedAt)}
            />
            <Column body={DeleteBodyTemplate} exportable={false} />
        </DataTable>
    )
}
