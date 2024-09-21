import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import Alert, { Props as AlertProps } from "./Alert"
import Toasts from "./Toasts"

type Props = { children: ReactNode }
type ToastItem = AlertProps & { key: string }
type ContextValue = {
    toasts: ToastItem[]
    setToasts: Dispatch<SetStateAction<ToastItem[]>>
}

export const ToastContext = createContext<ContextValue>({
    toasts: [],
    setToasts: () => {},
})

export default function ToastProvider({ children }: Props) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    return (
        <ToastContext.Provider value={{ toasts, setToasts }}>
            {children}

            <Toasts>
                {toasts.map(({ key, children, ...rest }) => (
                    <Alert key={key} {...rest}>
                        {children}
                    </Alert>
                ))}
            </Toasts>
        </ToastContext.Provider>
    )
}
