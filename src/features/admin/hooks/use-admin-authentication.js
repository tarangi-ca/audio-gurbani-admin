import { useMutation } from "@tanstack/react-query"
import axios from "../../../utilities/axios"
import { QUERY_KEY } from ".."

export function useAdminAuthentication() {
    return useMutation({
        mutationFn: async ({ emailAddress, password }) => {
            const { data } = await axios.post(
                `${import.meta.env.VITE_AUDIO_GURBANI_API_URL}/${QUERY_KEY}/token`,
                new URLSearchParams({
                    username: emailAddress,
                    password: password,
                })
            )

            return data["access_token"]
        },
    })
}
