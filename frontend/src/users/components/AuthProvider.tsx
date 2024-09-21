import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

type ContextType = {
    phone: string | undefined
    setPhone: Dispatch<SetStateAction<string | undefined>>
    telegramLink: string | undefined
    setTelegramLink: Dispatch<SetStateAction<string | undefined>>
}

export const AuthContext = createContext<ContextType>({} as ContextType)

type Props = {
    children: ReactNode
}

export default function AuthProvider({ children }: Props) {
    const [phone, setPhone] = useState<string | undefined>(undefined)
    const [telegramLink, setTelegramLink] = useState<string | undefined>(undefined)

    return (
        <AuthContext.Provider value={{ phone, setPhone, telegramLink, setTelegramLink }}>
            {children}
        </AuthContext.Provider>
    )
}
