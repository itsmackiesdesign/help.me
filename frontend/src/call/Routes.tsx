import { Route, Routes } from "react-router-dom"
import Call from "@call/pages/CallList"
import NotFound from "@core/pages/NotFound.tsx"
import CallDetail from "@call/pages/CallDetail.tsx"
import VideoCall from "@call/pages/VideoCall.tsx"

export default function CallRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Call />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/call/:id" element={<CallDetail />} />
            <Route path="/video-call" element={<VideoCall />} />
        </Routes>
    )
}
