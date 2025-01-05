import PrimeReactProvider from "primereact"
import "primereact/resources/themes/mira/theme.css"
import { AuthProvider } from "./features/auth/auth-provider"

function App() {
    return (
        <>
            <PrimeReactProvider>
                <AuthProvider>
                    <h1>App</h1>
                </AuthProvider>
            </PrimeReactProvider>
        </>
    )
}

export default App
