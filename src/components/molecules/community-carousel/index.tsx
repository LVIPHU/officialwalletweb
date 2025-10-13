"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {cn} from "@/lib/styles";

export function CommunityCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const cardIndex = {
        1: 'col-span-5',
        2: 'col-span-5 col-end-11',
        3: 'col-span-5 col-start-2',
        4: 'col-span-5 col-end-12'
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full h-full flex justify-center items-center"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className='h-full'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem key={index} className='h-full'>
                        <div className="grid md:grid-cols-11 gap-4 md:gap-12 h-full">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Card className={cn(cardIndex[(index % 4 + 1) as keyof typeof cardIndex], [])}>
                                    <CardContent className="flex h-full items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
