import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../index"
import axios from "axios"

export function useListArtists() {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async () => await axios.get(`/${QUERY_KEY}/`),
    })
}
