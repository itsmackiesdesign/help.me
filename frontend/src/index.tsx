import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BaseContextProvider from "@core/components/BaseContextProvider.tsx"
import ModalProvider from "@core/components/ModalProvider.tsx"
import UserRoutes from "@users/Routes.tsx"
import CallRoutes from "@call/Routes.tsx"
import MemberRoutes from "@members/Routes.tsx"

export default function App() {
    return (
        <StrictMode>
            <BaseContextProvider>
                <BrowserRouter>
                    <ModalProvider>
                        <Routes>
                            <Route path="/*" element={<UserRoutes />} />
                            <Route path="/calls/*" element={<CallRoutes />} />
                            <Route path="/members/*" element={<MemberRoutes />} />
                        </Routes>
                    </ModalProvider>
                </BrowserRouter>
            </BaseContextProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById("root")!).render(<App />)
