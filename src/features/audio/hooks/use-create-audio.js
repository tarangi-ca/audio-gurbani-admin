import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useCreateAudio = (displayName) => {
    return useMutation(
        async () => await axios.post(`/${QUERY_KEY}/`, { displayName })
    )
}
