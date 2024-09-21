import Button from "@core/components/Button.tsx"
import { ReactNode, useContext } from "react"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Col, Columns } from "@core/components/Columns.tsx"
import { ModalContext } from "@core/components/ModalProvider.tsx"

export type Props = {
    title: ReactNode
    className?: string
    onConfirm: () => void
}

export default function Confirm({ title, onConfirm, className }: Props) {
    const { setModal } = useContext(ModalContext)

    function confirm() {
        setModal(undefined)
        onConfirm()
    }

    return (
        <div className={className}>
            <h3>{title}</h3>

            <Columns gap="3" className="mt-5">
                <Col>
                    <Button text="Да" onClick={confirm} icon={CheckIcon} color="neutral" block />
                </Col>
                <Col>
                    <Button text="Отменить" onClick={close} icon={XMarkIcon} block />
                </Col>
            </Columns>
        </div>
    )
}
