import { Route, Routes } from "react-router-dom"
import Call from "@call/pages/Call.tsx"
import NotFound from "@core/pages/NotFound.tsx"
import CallDetail from "@call/pages/CallDetail.tsx"


export default function CallRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Call />} />
            <Route path="/call/:id" element={<CallDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
