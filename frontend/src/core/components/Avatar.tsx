import { BaseUserType } from "@users/types.ts"

export type Props<T extends BaseUserType> = {
    user: T
}

export default function Avatar<T extends BaseUserType>({ user }: Props<T>) {
    if (user.avatar) {
        return (
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={user.avatar} alt="avatar" />
                </div>
            </div>
        )
    }

    return (
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="uppercase">
                    {user.firstName.substring(0, 1)}
                    {user.lastName.substring(0, 1)}
                </span>
            </div>
        </div>
    )
}
