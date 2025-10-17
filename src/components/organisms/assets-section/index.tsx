'use client'
import {Container} from "@/components/atoms/container";
import {Trans} from "@lingui/react/macro";
import {CHAINS} from "@/constants/landing.constants";
import {ChainCard} from "@/components/molecules/chain-card";
import dynamic from "next/dynamic";
import {AnimatedContentProps} from "@/components/atoms/animated-content";

const AnimatedContent = dynamic(() => import('@/components/atoms/animated-content').then((AnimatedContent) => AnimatedContent), { ssr: false })

export default function AssetsSection() {

    const animatedContentArgs: AnimatedContentProps = {}

    return (
        <Container id='assets' className='min-h-dvh py-5 md:py-10 xl:py-16'>
            <div className='flex flex-col items-center justify-center gap-8 md:gap-12'>
                <div className='relative flex max-w-3xl flex-col items-center gap-8 text-center md:gap-6'>
                    <AnimatedContent name={'asset-title'}>
                        <h2 className='font-clash-display text-4xl font-semibold'>
                            <Trans>One Platform, Millions of Assets</Trans>
                        </h2>
                    </AnimatedContent>
                    <AnimatedContent name={'asset-description'}>
                        <p>
                            <Trans>
                                As a leading self-custody multi-chain platform, we support millions of assets across 100+ blockchains.
                                From Bitcoin, Ethereum, and Solana, to Cosmos, Optimism, and much more.
                            </Trans>
                        </p>
                    </AnimatedContent>
                </div>
                <div className='grid w-full grid-cols-2 gap-4 md:gap-10 lg:grid-cols-4'>
                    {CHAINS.map((crypto) => (
                        <ChainCard key={crypto.id} chain={crypto} />
                    ))}
                </div>
            </div>
        </Container>
    )
}