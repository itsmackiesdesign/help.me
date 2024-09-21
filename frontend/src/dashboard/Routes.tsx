import { Route, Routes } from "react-router-dom"
import Dashboard from "@dashboard/pages/Dashboard.tsx"
import Clients from "@dashboard/pages/Clients.tsx"

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
        </Routes>
    )
}
