import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import { Button } from "primereact/button"
import { useListArtists } from "../hooks/use-get-artists"
import PropTypes from "prop-types"
import { useDeleteArtist } from "../hooks/use-delete-artist"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from ".."

function ArtistColumn({ field, header, isLoading }) {
    return (
        <Column
            field={field}
            header={header}
            body={isLoading ? <Skeleton /> : undefined}
        />
    )
}

ArtistColumn.propTypes = {
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
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
            />
            <ArtistColumn
                field="updatedAt"
                header="Updated At"
                isLoading={isLoading}
            />
            <Column body={DeleteBodyTemplate} exportable={false} />
        </DataTable>
    )
}
