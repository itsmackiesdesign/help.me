import { Route, Routes } from "react-router-dom"
import Members from "@members/pages/Members.tsx"
import NotFound from "@core/pages/NotFound.tsx"

export default function MemberRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Members />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
