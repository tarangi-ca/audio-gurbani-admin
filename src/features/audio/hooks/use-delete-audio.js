import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useDeleteAudio = (id) => {
    return useMutation(async () => await axios.delete(`/${QUERY_KEY}/${id}`))
}
