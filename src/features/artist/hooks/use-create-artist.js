import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { QUERY_KEY } from "../index"

export const useCreateArtist = (displayName, slug) => {
    return useMutation(
        async () => await axios.post(`/${QUERY_KEY}/`, { displayName, slug })
    )
}
