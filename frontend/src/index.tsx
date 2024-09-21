import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BaseContextProvider from "@core/components/BaseContextProvider.tsx"
import ModalProvider from "@core/components/ModalProvider.tsx"
import UserRoutes from "@users/Routes.tsx"
import DashboardRoutes from "@dashboard/Routes.tsx";

export default function App() {
    return (
        <StrictMode>
            <BaseContextProvider>
                <BrowserRouter>
                    <ModalProvider>
                        <Routes>
                            <Route path="/users/*" element={<UserRoutes />} />
                            <Route path="/*" element={<DashboardRoutes />} />
                        </Routes>
                    </ModalProvider>
                </BrowserRouter>
            </BaseContextProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById("root")!).render(<App />)
