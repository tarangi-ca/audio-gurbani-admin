import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { QUERY_KEY } from "../index"

export const useDeleteCollection = (id) => {
    return useMutation(async () => await axios.delete(`/${QUERY_KEY}/${id}`))
}
