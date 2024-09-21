import { clsx } from "clsx"
import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import Icon from "./Icon"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Button from "./Button"

export type Props = {
    color?: keyof typeof colors
    className?: string
    icon?: FC<{ className?: string }>
    children: ReactNode
    closeable?: boolean
    onClose?: () => void
    onClick?: () => void
    timeout?: number
}

const colors = {
    info: "alert-info",
    primary: "alert-primary",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
}

export default function Alert({
    color,
    icon,
    className = "",
    children,
    closeable = true,
    onClose,
    onClick,
    timeout = 4000,
}: Props) {
    const [visible, setVisible] = useState(true)
    const colorClass = color ? colors[color] : ""
    const close = useCallback(() => {
        setVisible(false)
        onClose?.()
    }, [])

    useEffect(() => {
        if (!timeout) return
        const timer = setTimeout(close, timeout)
        return () => clearTimeout(timer)
    }, [close, timeout])

    function handleClick() {
        if (!onClick) return
        onClick()
        close()
    }

    if (!visible) return

    return (
        <div className={clsx("alert", className, colorClass)}>
            {icon && <Icon icon={icon} />}
            <div className={clsx(onClick && "cursor-pointer")} onClick={handleClick}>
                {children}
            </div>
            <div></div>

            {closeable && <Button onClick={close} icon={XMarkIcon} className="ml-2" size="xs" color="ghost" circle />}
        </div>
    )
}
