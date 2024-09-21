import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import Modal from "./Modal"

export type ContextType = {
    setModal: Dispatch<SetStateAction<ReactNode | undefined>>
}

export const ModalContext = createContext<ContextType>({} as ContextType)

export type Props = {
    children?: ReactNode
}

export default function ModalProvider({ children }: Props) {
    const [modal, setModal] = useState<ReactNode | undefined>()

    return (
        <ModalContext.Provider value={{ setModal }}>
            {children}

            {modal ? (
                <Modal isActive onClose={() => setModal(undefined)}>
                    {modal}
                </Modal>
            ) : null}
        </ModalContext.Provider>
    )
}
