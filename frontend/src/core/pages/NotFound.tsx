import Navbar from "@core/components/Navbar.tsx"
import Button from "@core/components/Button.tsx"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar className="bg-white" title="Help me" />
            <div className="flex justify-center items-center h-[80vh] flex-col space-y-3">
                <h1 className="text-4xl font-bold text-error">Page not found (404)</h1>
                <Button onClick={() => navigate("/")} className="ml-4" color="primary" to="/" text="Go back" />
            </div>
        </>
    )
}
