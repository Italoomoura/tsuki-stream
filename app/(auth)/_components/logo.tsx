import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
    return (
        <div className="flex flex-col gap-y-4 items-center">
            <div className="bg-white rounded-full p-1">
                <Image src="/tsuki.svg" alt="Tsuki" height="65" width="65"/>
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className
            )}>
                <p className="text-sm text-muted-foreground">
                    Lights up the night
                </p>
            </div>
        </div>
    );
};