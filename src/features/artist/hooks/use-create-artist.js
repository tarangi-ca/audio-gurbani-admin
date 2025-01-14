import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useCreateArtist = () => {
    return useMutation({
        mutationFn: async ({ displayName, slug }) =>
            await axios.post(
                `/${QUERY_KEY}/`,
                { displayName, slug },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ),
    })
}
