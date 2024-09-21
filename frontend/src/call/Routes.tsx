import { Route, Routes } from "react-router-dom"
import Call from "@call/pages/Call.tsx"

export default function CallRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Call />} />
        </Routes>
    )
}
