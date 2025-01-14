import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useCreateAudio = () => {
    return useMutation({
        mutationFn: async ({ file, displayName, collectionId }) => {
            const {
                data: { id, url },
            } = await axios.post(`/${QUERY_KEY}/pre-signed-url`)

            await fetch(url, {
                method: "PUT",
                body: file,
            })

            return await axios.post(`/${QUERY_KEY}/`, {
                id,
                displayName,
                collectionId,
            })
        },
    })
}
