import { useEffect, useRef } from 'react';
import { animate, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
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

function WaxSealContent() {
    return (
        <div className="wax-seal">
            <svg className="wax-seal__heart" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#f5f0e8" />
            </svg>
        </div>
    );
}

export default function WeddingEnvelope({ guest, code }: WeddingEnvelopeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef<boolean>(false);

    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    function startAnimation() {
        isScrolling.current = true;
        document.body.style.overflow = 'hidden';
    }

    function openEnvelope() {
        window.scrollTo({
            top: window.scrollY + (window.innerHeight * 2),
            behavior: 'smooth'
        })
    }

    function closeEnvelope() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        function handleWheel(e: any) {
            startAnimation();
            const letterRefTop = letterRef?.current?.getBoundingClientRect()?.top || 10;

            if (e.deltaY > 0) {
                openEnvelope();
            } else if (e.deltaY < 0 && letterRefTop >= -50) {
                closeEnvelope()
            }
        }

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    // Flap animation: 0% to 40% of scroll
    const flapRotateX = useTransform(scrollYProgress, [0, 0.4], [0, 180]);
    const flapZIndex = useTransform(scrollYProgress, [0, 0.39, 0.4], [2, 2, 0]);

    // Letter animation: starts behind pocket inside envelope, rises and scales to fill viewport
    // bottom: starts at 0 (inside envelope), rises up as scroll progresses
    const letterBottom = useTransform(scrollYProgress, [0, .5, .7, .9, 1], [-300, -300, -100, -200, -301]);
    // scale: starts tiny inside envelope, grows to fill viewport
    const letterScale = useTransform(scrollYProgress, [0.34, .44, .55, .66, .77, .88, 0.95], [0.15, .15, .15, .15, .25, .50, 1]);
    // const letterScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 1], [0.15, 0.35, 0.65, 1]);
    // z-index: starts behind pocket (1), jumps in front of everything (10)
    const letterZIndex = useTransform(scrollYProgress, [0.34, .44, .55, .66, .77, .88, 0.95], [1, 1, 1, 1, 8, 8, 10]);

    // Envelope fades out as letter takes over
    const envelopeOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 1]);

    // const scrollBehaviour = useTransform(scrollYProgress, [0, .999999, 100], ['hidden', 'hidden', 'auto'])


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

                        {/* Letter — inside envelope, behind pocket (z-index 1 < pocket's 2) */}
                        <motion.div
                            className="letter-container"
                            style={{
                                bottom: letterBottom,
                                scale: letterScale,
                                zIndex: letterZIndex,
                            }}

                        >
                            <Invitation ref={letterRef} guest={guest} code={code} />
                        </motion.div>

                        {/* <div className="twine">
                            <div className="twine__line" />
                            <div className="twine__bow">
                                <div className="twine__bow-loop twine__bow-loop--left" />
                                <div className="twine__bow-loop twine__bow-loop--right" />
                                <div className="twine__bow-knot" />
                            </div>
                        </div> */}

                        {/* Wax seal — top half rotates with flap */}
                        <motion.div
                            className="seal-half seal-half--top"
                            style={{
                                rotateX: flapRotateX,
                                zIndex: flapZIndex,
                                transformOrigin: "top"
                            }}
                        >
                            <WaxSealContent />
                        </motion.div>

                        {/* Wax seal — bottom half stays on envelope */}
                        <div className="seal-half seal-half--bottom">
                            <WaxSealContent />
                        </div>
                    </motion.div>

                    {/* Scroll hint below envelope */}
                    <motion.div
                        className="envelope-scroll-hint"
                    >
                        <ScrollHint variant="dark" text="Deslizá para abrir" />
                    </motion.div>
                </div>
            </div>
        </>
    );
}
