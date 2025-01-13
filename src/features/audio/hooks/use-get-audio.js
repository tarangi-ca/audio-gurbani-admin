import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../index"
import axios from "../../../utilities/axios"

export function useAudioDetail(id) {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: async () => await axios.get(`/${QUERY_KEY}/${id}/`),
    })
}
