import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import { Button } from "primereact/button"
import { useListAudios } from "../hooks/use-get-audios"
import PropTypes from "prop-types"
import { useDeleteAudio } from "../hooks/use-delete-audio"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from ".."

function AudioColumn({ field, header, isLoading }) {
    return (
        <Column
            field={field}
            header={header}
            body={isLoading ? <Skeleton /> : undefined}
        />
    )
}

AudioColumn.propTypes = {
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

function DeleteBodyTemplate({ id }) {
    const client = useQueryClient()
    const { mutate: deleteAudio, isLoading: isLoading } = useDeleteAudio()

    const onDelete = (event) => {
        event.preventDefault()

        deleteAudio(
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

export function AudioTable() {
    const { data: audios, isLoading } = useListAudios()

    return (
        <DataTable
            value={
                isLoading ? Array.from({ length: 5 }, (v, i) => i) : audios.data
            }
        >
            <AudioColumn field="id" header="ID" isLoading={isLoading} />
            <AudioColumn
                field="displayName"
                header="Display Name"
                isLoading={isLoading}
            />
            <AudioColumn
                field="collectionId"
                header="Collection ID"
                isLoading={isLoading}
            />
            <AudioColumn
                field="createdAt"
                header="Created At"
                isLoading={isLoading}
            />
            <AudioColumn
                field="updatedAt"
                header="Updated At"
                isLoading={isLoading}
            />
            <Column body={DeleteBodyTemplate} exportable={false} />
        </DataTable>
    )
}
