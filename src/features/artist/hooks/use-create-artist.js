import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"
import { useCreateFile } from "../../file/hooks/use-create-file"

export const useCreateArtist = () => {
    const { mutate: createFile, data, isLoading, error } = useCreateFile()

    return useMutation({
        mutationFn: async ({ file, displayName, slug }) => {
            createFile({ file, folder: "images" })

            if (!isLoading && !error) {
                console.log(data)
                return await axios.post(
                    `/${QUERY_KEY}/`,
                    { id: data, displayName, slug },
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
