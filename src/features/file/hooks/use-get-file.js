import { useQuery } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useFileDetail = (folder, id) => {
    return useQuery({
        queryKey: [QUERY_KEY, folder, id],
        queryFn: async () => {
            const {
                data: { url },
            } = await axios.get(`/${QUERY_KEY}/pre-signed-url/${folder}/${id}`)

            return url
        },
    })
}
