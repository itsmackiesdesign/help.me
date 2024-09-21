import AuthLayout from "@users/components/AuthLayout.tsx"
import Button from "@core/components/Button.tsx"
import { FormProvider, useForm } from "react-hook-form"
import { useMask } from "@react-input/mask"
import { Navigate, useNavigate } from "react-router-dom"
import { SignInFormData } from "@users/types.ts"
import { useContext } from "react"
import { AuthContext } from "@users/components/AuthProvider.tsx"
import { useSignIn } from "@users/hooks/users.tsx"
import { isAuthenticated } from "@users/utils/auth.ts"

export default function SignIn() {
    const { setPhone, setTelegramLink } = useContext(AuthContext)
    const navigate = useNavigate()
    const methods = useForm<SignInFormData>()
    const signIn = useSignIn()

    const inputRef = useMask({ mask: "(__) ___-__-__", replacement: { _: /\d/ } })
    const { ref: formInputRef, ...rest } = methods.register("phone")

    async function onSubmit(data: SignInFormData) {
        const phone = "+998" + data.phone.replace(/\D/g, "")
        data = { phone, type: "Admin" }
        setPhone(phone)

        const response = await signIn.mutateAsync(data)
        setTelegramLink(response.message)

        navigate("/check-in")
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <AuthLayout>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3  w-xs lg:w-[30%] max-w-sm"
                >
                    <h3 className="text-center">Log in</h3>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-center">Enter Phone</span>
                        </div>

                        <label className="input input-bordered flex items-center gap-2">
                            <span>+998</span>

                            <input
                                {...rest}
                                ref={(e) => {
                                    formInputRef(e)
                                    inputRef.current = e
                                }}
                                type="text"
                                className="grow"
                                name="phone"
                                placeholder="(00) 000-00-00"
                                autoFocus
                            />
                        </label>
                    </label>

                    <Button className="w-full" text="Send code" loading={signIn.isLoading} submit />

                    <p className="text-center text-base-content text-sm">Open Telegram</p>
                </form>
            </FormProvider>
        </AuthLayout>
    )
}
