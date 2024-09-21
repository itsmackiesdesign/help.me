import { clsx } from "clsx"

export type Props = {
    avatar?: string | null
    firstName: string
    lastName?: string
    wrapperClassName?: string
    className?: string
}

export default function AvatarUser({ avatar, firstName, lastName, wrapperClassName, className }: Props) {
    if (avatar) {
        return (
            <div className={clsx("avatar", wrapperClassName)}>
                <div className={clsx("w-10 rounded-full", className)}>
                    <img src={avatar} alt="avatar" />
                </div>
            </div>
        )
    }

    return (
        <div className={clsx("avatar placeholder", wrapperClassName)}>
            <div className={clsx("bg-neutral text-neutral-content rounded-full w-10", className)}>
                <span className="uppercase">
                    {firstName?.substring(0, 1)}
                    {lastName?.substring(0, 1)}
                </span>
            </div>
        </div>
    )
}
