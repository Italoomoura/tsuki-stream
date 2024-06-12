"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    userID: string;
}

export const Actions = ({
    isFollowing,
    userID,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();


    const handleFollow = () => {
        startTransition(() => {
            onFollow(userID)
                .then((data) => toast.success(`Você agora está seguindo ${data.following.username}`))
                .catch(() => toast.error("Algo deu errado"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userID)
                .then((data) => toast.success(`Você deixou de seguir ${data.following.username}`))
                .catch(() => toast.error("Algo deu errado"));
        });
    };

    const onClick = () => {
        isFollowing ? handleUnfollow() : handleFollow()
    }

    const handleBlock = () => {
        startTransition(() => {
            onUnblock(userID)
             .then((data) => toast.success(`Usuário ${data.blocked.username} bloqueado`))
             .catch(() => toast.error("Algo deu errado"));
        });
    }

    return (
        <>
            <Button 
                disabled={isPending}
                onClick={onClick}    
                variant="primary"
            >
                {isFollowing ? "Deixar de Seguir" : "Seguir"}
            </Button>
            <Button
                onClick={handleBlock}
                disabled={isPending}
            >
                Block
            </Button>
        </>
    );
};