import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"
import { useCreateFile } from "../../file/hooks/use-create-file"

export const useCreateAudio = () => {
    const { mutate: createFile, data, isLoading, error } = useCreateFile()

    return useMutation({
        mutationFn: async ({ file, displayName, collectionId }) => {
            createFile({ file, folder: "audios" })

            if (!isLoading && !error) {
                return await axios.post(
                    `/${QUERY_KEY}/`,
                    { id: data, displayName, collectionId },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            }

            return error
        },
    })
}
