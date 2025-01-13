import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useState } from "react"
import { useAdminAuthentication } from "../hooks/use-admin-authentication"
import { useAuth } from "../../admin/use-auth-context"

export function SignInForm() {
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")

    const { mutate: authenticate, isLoading, error } = useAdminAuthentication()
    const { signIn } = useAuth()

    const onSubmit = (event) => {
        event.preventDefault()

        authenticate(
            { emailAddress, password },
            { onSuccess: (token) => signIn(token) }
        )
    }

    return (
        <div className="card">
            <div className="flex flex-column m-4">
                <h2>Audio Gurbani</h2>
            </div>
            <form onSubmit={onSubmit} className="flex flex-column gap-3 m-4">
                <div className="flex flex-column gap-3">
                    <label htmlFor="emailAddress">Email Address</label>
                    <InputText
                        id="emailAddress"
                        value={emailAddress}
                        onChange={(event) =>
                            setEmailAddress(event.target.value)
                        }
                        disabled={isLoading}
                    />
                </div>
                <div className="flex flex-column gap-3">
                    <label htmlFor="password">Password</label>
                    <InputText
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="flex flex-column gap-3">
                    <Button
                        label="Submit"
                        icon="pi pi-check"
                        disabled={isLoading}
                    />
                </div>
                {error && (
                    <div className="text-red-500">
                        {error.response?.data?.message || error.message}
                    </div>
                )}
            </form>
        </div>
    )
}
