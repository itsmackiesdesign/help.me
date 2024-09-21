import "@core/static/style.css"
import ToastProvider from "@core/components/ToastProvider.tsx"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

type Props = {
    children?: ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 30000,
            retry: 1,
        },
    },
})

export default function BaseContextProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>{children}</ToastProvider>
        </QueryClientProvider>
    )
}
