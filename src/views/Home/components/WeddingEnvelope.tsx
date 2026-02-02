import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Letter from '@/components/Letter';
import Invitation from '../../Invitation';
import ScrollHint from '../../Invitation/components/ScrollHint';

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    confirmado: boolean
    createdAt: string
    updatedAt: string
}

interface WeddingEnvelopeProps {
    guest?: Guest | null
    code?: string
}

export default function WeddingEnvelope({ guest, code }: WeddingEnvelopeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Flap animation: 0% to 40% of scroll
    const flapRotateX = useTransform(scrollYProgress, [0, 0.4], [0, 180]);
    const flapZIndex = useTransform(scrollYProgress, [0, 0.39, 0.4], [2, 2, 0]);

    // Letter animation: 40% to 100% of scroll - rises and centers
    const letterBottom = useTransform(scrollYProgress, [0.4, .6, .8, 1], [0, 300, 150, 120]);
    const letterScale = useTransform(scrollYProgress, [0.4, .6, .8, 1], [1, 1.25, 1.5, 2]);
    const letterZIndex = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
    const letterOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 1]);

    // Envelope fades out as letter takes over
    const envelopeOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 1]);

    const heartRotate = useTransform(scrollYProgress, [0, 0.2], ['45deg', '90deg']);
    const heartOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 1]);

    // Scroll hint fades out as you scroll
    // const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <>
            {/* Envelope Section */}
            <div className="container" ref={containerRef}>
                <div className="envelope-wrapper">
                    <motion.div className="envelope" style={{ opacity: envelopeOpacity }}>
                        <motion.div
                            className="flap"
                            style={{
                                rotateX: flapRotateX,
                                zIndex: flapZIndex,
                                transformOrigin: "top"
                            }}
                        />
                        <div className="pocket" />
                        <motion.div
                            className="heart"
                            style={{ rotate: heartRotate, opacity: heartOpacity }}
                        />
                    </motion.div>

                    {/* Letter - rises and centers */}
                    <motion.div
                        className="letter-container"
                        style={{
                            bottom: letterBottom,
                            scale: letterScale,
                            zIndex: letterZIndex,
                            opacity: letterOpacity
                        }}
                    >
                        <Letter />
                    </motion.div>

                    {/* Scroll hint below envelope */}
                    <motion.div
                        className="envelope-scroll-hint"
                        // style={{ opacity: scrollHintOpacity }}
                    >
                        <ScrollHint variant="dark" text="Deslizá para abrir" />
                    </motion.div>
                </div>
            </div>

            {/* Full Invitation Content */}
            <Invitation guest={guest} code={code} />
        </>
    );
}
