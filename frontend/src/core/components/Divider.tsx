import { clsx } from "clsx"

export type Props = {
    text?: string
    horizontal?: boolean
    className?: string
}

export default function Divider({ text, className, horizontal }: Props) {
    return <div className={clsx("divider", className, { "divider-horizontal": horizontal })}>{text}</div>
}
