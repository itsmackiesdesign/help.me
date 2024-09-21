import { Route, Routes } from "react-router-dom"
import Members from "@members/pages/Members.tsx"

export default function MemberRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Members />} />
        </Routes>
    )
}
