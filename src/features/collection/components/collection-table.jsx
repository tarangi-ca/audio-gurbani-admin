import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import { Button } from "primereact/button"
import { useListCollections } from "../hooks/use-get-collections"
import PropTypes from "prop-types"
import { useDeleteCollection } from "../hooks/use-delete-collection"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from ".."

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
            <CollectionColumn
                field="createdAt"
                header="Created At"
                isLoading={isLoading}
            />
            <CollectionColumn
                field="updatedAt"
                header="Updated At"
                isLoading={isLoading}
            />
            <Column body={DeleteBodyTemplate} exportable={false} />
        </DataTable>
    )
}
