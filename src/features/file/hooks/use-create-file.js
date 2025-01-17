import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from "../index"

export const useCreateFile = () => {
    return useMutation({
        mutationFn: async ({ file, folder }) => {
            const {
                data: { id, url },
            } = await axios.post(`/${QUERY_KEY}/pre-signed-url/${folder}`)

            await fetch(url, {
                method: "PUT",
                body: file,
            })

            return id
        },
    })
}
