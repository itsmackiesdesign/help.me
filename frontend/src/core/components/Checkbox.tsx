import { ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    labelClassName?: string
    labelTextClassName?: string
    checkBoxClassName?: string
    defaultChecked?: boolean
    labelText?: ReactNode
}

export default function Checkbox({
    labelClassName,
    labelTextClassName,
    checkBoxClassName,
    defaultChecked,
    labelText,
}: Props) {
    return (
        <label className={clsx("label cursor-pointer", labelClassName)}>
            {labelText && <span className={clsx("label-text", labelTextClassName)}>{labelText}</span>}
            <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className={clsx(
                    "checkbox border-neutral [--chkbg:theme(colors.neutral)] [--chkfg:white]",
                    checkBoxClassName
                )}
            />
        </label>
    )
}
