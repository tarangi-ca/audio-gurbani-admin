import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useCreateCollection = () => {
    return useMutation({
        mutationFn: async ({ displayName, slug, artistId }) =>
            await axios.post(`/${QUERY_KEY}/`, { displayName, slug, artistId }),
    })
}
