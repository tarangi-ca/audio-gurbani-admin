import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "primeflex/primeflex.min.css"
import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.jsx"
import { AuthProvider } from "./features/admin/auth-provider"

const client = new QueryClient()

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <PrimeReactProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </PrimeReactProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)
