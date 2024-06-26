"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import { useRouter } from "next/navigation";

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversation/${data.data.id}`);
        })
        .finally(() => setIsLoading(false));
    }, [data, router]);

    return (
        <div className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bf-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        ">
            <Avatar user={data} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-1
                    ">
                        <p className="
                            text-sm
                            font-medium
                            text-gray-900
                        ">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBox;