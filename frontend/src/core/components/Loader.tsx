import { clsx } from "clsx"

export type Props = {
    center?: boolean
    className?: string
    show?: boolean
    inline?: boolean
    text?: string
    size?: keyof typeof sizes
    type?: keyof typeof types
}

const sizes = { lg: "loading-lg", md: "", sm: "loading-sm", xs: "loading-xs" }
const types = {
    ring: "loading-ring",
    ball: "loading-ball",
    bars: "loading-bars",
    spinner: "loading-spinner",
    infinity: "loading-infinity",
}

export default function Loader({
    size,
    type = "spinner",
    center,
    className,
    text,
    show = true,
    inline = false,
}: Props) {
    if (!show) return null

    return (
        <div className={clsx(className, { flex: text || center, "inline-flex": inline, "justify-center": center })}>
            <span className={clsx("loading", types[type ?? "spinner"], sizes[size ?? "md"])} />
            {text && <span className="my-auto ml-2">{text}</span>}
        </div>
    )
}
