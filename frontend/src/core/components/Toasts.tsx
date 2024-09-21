"use client"
import { ReactNode } from "react"

export type Props = {
    children: ReactNode
}

export default function Toasts({ children }: Props) {
    return <div className="toast toast-end">{children}</div>
}
