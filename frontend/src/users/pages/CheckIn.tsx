import AuthLayout from "@users/components/AuthLayout.tsx"
import Button from "@core/components/Button.tsx"
import FormInput from "@core/components/FormInput.tsx"
import { useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CheckInFormData } from "@users/types.ts"
import { AuthContext } from "@users/components/AuthProvider.tsx"
import { useCheckIn } from "@users/hooks/users.tsx"
import { isAuthenticated, signIn } from "@users/utils/auth.ts"
import { Navigate, useNavigate } from "react-router-dom"

export default function CheckIn() {
    const { phone, telegramLink } = useContext(AuthContext)
    const methods = useForm<CheckInFormData>()
    const checkIn = useCheckIn()
    const navigate = useNavigate()

    async function onSubmit(data: CheckInFormData) {
        data = { ...data, phone }
        const response = await checkIn.mutateAsync(data)
        signIn(response)
        navigate("/dashboard")
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <AuthLayout>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 w-xs lg:w-[30%] max-w-sm"
                >
                    <h3 className="text-center">Login</h3>

                    <FormInput
                        name="code"
                        label="Enter code"
                        autoComplete="one-time-code"
                        errorText="Wrong code"
                        placeholder="000000"
                        maxLength={6}
                        autoFocus
                    />

                    <Button className="w-full" text="Check in" loading={checkIn.isLoading} submit />

                    <a
                        href={telegramLink}
                        target="_blank"
                        className="w-full btn btn-accent text-white"
                        rel="noreferrer"
                    >
                        Open Telegram
                        <img className="w-5 h-5" src="/telegram.png" alt="telegram white icon" />
                    </a>

                    <p className="text-center text-base-content text-sm">Get code</p>
                </form>
            </FormProvider>
        </AuthLayout>
    )
}
