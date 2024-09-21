import Button from "./Button"
import { createContext, ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    isActive?: boolean
    children: ReactNode
    onClose: () => void
}

export const CloseModalContext = createContext(() => {})

export default function Modal({ isActive, children, onClose }: Props) {
    return (
        <dialog className={clsx("modal modal-bottom sm:modal-middle", { "modal-open": isActive })}>
            <div className="modal-box">
                <Button className="absolute right-2 top-2" onClick={onClose} color="ghost" size="sm" text="✕" circle />

                <CloseModalContext.Provider value={onClose}>{children}</CloseModalContext.Provider>
            </div>

            <div onClick={onClose} className="modal-backdrop" />
        </dialog>
    )
}
