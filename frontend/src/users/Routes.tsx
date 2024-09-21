import { Route, Routes } from "react-router-dom"
import SignIn from "@users/pages/SignIn.tsx"
import CheckIn from "@users/pages/CheckIn.tsx"
import AuthProvider from "@users/components/AuthProvider.tsx"

export default function UserRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/check-in" element={<CheckIn />} />
            </Routes>
        </AuthProvider>
    )
}
