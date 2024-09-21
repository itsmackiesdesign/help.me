import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function AuthLayout({ children }: Props) {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-full min-h-[70vh] flex items-center justify-center">{children}</div>
        </main>
    )
}
