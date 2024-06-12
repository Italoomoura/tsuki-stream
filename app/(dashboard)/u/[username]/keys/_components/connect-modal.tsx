"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IngressInput } from "livekit-server-sdk"
import { useState, useTransition, useRef, ElementRef } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Entrada criada")
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Algo deu errado"));
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">
                    Gerar Conexão
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gerar conexão</DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo de Entrada" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Atenção!</AlertTitle>
                    <AlertDescription>Esta ação irá resetar todas as streams usando a conexão</AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        onClick={onSubmit}
                        variant="primary"
                    >   
                        Gerar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}