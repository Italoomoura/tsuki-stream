import { getSelf } from "@/lib/auth-service";
import { getStreamByUserdId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserdId(self.id);
    
    if(!stream) {
        throw new Error("Stream not found");
    }

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Configurações do Chat
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard 
                    field="isChatEnable"
                    label="Habilitar Chat"
                    value={stream.isChatEnable}
                />
                <ToggleCard 
                    field="isChatDelayed"
                    label="Habilitar modo devagar"
                    value={stream.isChatDelayed}
                />
                <ToggleCard 
                    field="isChatFollowersOnly"
                    label="Habilitar Chat somente seguidores"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}

export default ChatPage;