import { Download } from "@/types/landing.types";
import { NavigationLink } from "@/components/atoms/navigation-link";
import Image from "next/image";
import { cn } from "@/lib/styles";

interface DownloadCardProps {
    data: Download;
}

export function DownloadCard({ data }: DownloadCardProps) {
    return (
        <NavigationLink href={data.url}>
            <div
                className={cn(
                    "relative overflow-hidden flex justify-center items-center w-[400px] h-[210px] rounded-3xl",
                    "border border-solid border-[rgba(255,_255,_255,_0.5)] hover:border-[#0DCC61]",
                    "bg-[linear-gradient(294.04deg,_#003100_-39.23%,_#002500_-2.81%,_#000B00_82.39%,_#003E00_144.17%)] transition-all duration-300",
                    // before element chỉ xuất hiện khi hover
                    "before:content-[''] before:absolute before:-bottom-30 before:w-[305px] before:h-[175px]",
                    "before:bg-[radial-gradient(ellipse_at_center,_rgba(13,204,97,0.5)_0%,_rgba(13,204,97,0.2)_40%,_rgba(13,204,97,0)_60%)]",
                    "before:pointer-events-none before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
                )}
            >
                <Image src={data.image} alt={data.id} width={210} height={52} />
            </div>
        </NavigationLink>
    );
}
