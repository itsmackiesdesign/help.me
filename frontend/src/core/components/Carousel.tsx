import clsx from "clsx"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
    center?: boolean
}

export default function Carousel({ children, className, center }: Props) {
    return <div className={clsx("carousel", { "carousel-center": center }, className)}>{children}</div>
}
