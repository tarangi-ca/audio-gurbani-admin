import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useDeleteAudio = () => {
    return useMutation({
        mutationFn: async ({ id }) => await axios.delete(`/${QUERY_KEY}/${id}`),
    })
}
