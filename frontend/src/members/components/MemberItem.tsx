import { MemberType } from "@members/types.ts"
import Button from "@core/components/Button.tsx"
import { CakeIcon, InformationCircleIcon, MapIcon, UserIcon } from "@heroicons/react/24/solid"
import { useContext } from "react"
import { ModalContext } from "@core/components/ModalProvider.tsx"
import MemberInfo from "@members/components/MemberInfo.tsx"

interface MemberCardProps {
    member: MemberType
}

export default function MemberCard({ member }: MemberCardProps) {
    const { setModal } = useContext(ModalContext)

    function openModal() {
        setModal(<MemberInfo member={member} />)
    }

    return (
        <div className="card bg-base-100 shadow-xl transition-transform transform hover:scale-105">
            <div className="card-body">
                <h2 className="card-title flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-primary" />
                    {member.user.firstName} {member.user.lastName}
                </h2>
                <p className="flex items-center">
                    <CakeIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Birthdate: {new Date(member.birthdate).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                    <MapIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Address: {member.address}
                </p>
                <p className="flex items-center">
                    <InformationCircleIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Extra: {member.extra}
                </p>
                <div className="card-actions justify-end">
                    <Button className="btn btn-primary" onClick={openModal} size={"sm"}>
                        View
                    </Button>
                </div>
            </div>
        </div>
    )
}
