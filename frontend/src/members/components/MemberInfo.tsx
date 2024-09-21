import { MemberType } from "@members/types.ts"
import {
    UserIcon,
    PhoneIcon,
    CakeIcon,
    MapIcon,
    CheckCircleIcon,
    XCircleIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline"

export type MemberInfoProps = {
    member: MemberType
}

export default function MemberInfo({ member }: MemberInfoProps) {
    return (
        <div className="p-6 bg-white">
            <h2 className="text-2xl font-bold flex items-center mb-4">
                <IdentificationIcon className="w-6 h-6 mr-2 text-primary" />
                {member.user.fullName || `${member.user.firstName} ${member.user.lastName}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-700">
                        <strong>Username:</strong> {member.user.username}
                    </p>
                </div>
                <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-700">
                        <strong>Phone:</strong> {member.user.phone}
                    </p>
                </div>
                <div className="flex items-center">
                    <CakeIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-700">
                        <strong>Birthdate:</strong> {new Date(member.birthdate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <MapIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-700">
                        <strong>Address:</strong> {member.address}
                    </p>
                </div>
                <div className="flex items-center">
                    <XCircleIcon
                        className={`w-5 h-5 mr-2 ${member.user.verifiedAt ? "text-green-600" : "text-red-600"}`}
                    />
                    <p className="text-gray-700">
                        <strong>Verified:</strong>{" "}
                        {member.user.verifiedAt ? (
                            <span className="text-green-600">
                                Verified on {new Date(member.user.verifiedAt).toLocaleDateString()}
                            </span>
                        ) : (
                            <span className="text-red-600">Not Verified</span>
                        )}
                    </p>
                </div>
                <div className="col-span-2">
                    <div className="flex items-center">
                        <CheckCircleIcon className="w-5 h-5 mr-2 text-gray-600" />
                        <p className="text-gray-700">
                            <strong>Extra Info:</strong>
                        </p>
                    </div>
                    <p className="mt-2 text-gray-700 whitespace-pre-line break-words">{member.extra}</p>
                </div>
            </div>
        </div>
    )
}
