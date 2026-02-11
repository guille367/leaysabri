import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
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
    const letterContainerRef = useRef<HTMLDivElement>(null);

    const [isLetterFullyOpen, setIsLetterFullyOpen] = useState(false);

    // Compute bottom offsets based on viewport so the letter travels from
    // inside the envelope to covering the full viewport.
    // Envelope (240px) is centered at 50vh → bottom edge at 50vh + 120px.
    // Letter (100vh) start: tucked inside envelope. End: aligned with viewport.
    const [startBottom, setStartBottom] = useState(-360);
    const [finalBottom, setFinalBottom] = useState(-301);

    useEffect(() => {
        const update = () => {
            const vh = window.innerHeight;
            setFinalBottom(-(vh / 2 - 120));
            // Interpolate start from -264 (mobile <=375px) to -360 (desktop >=1024px)
            const t = Math.min(1, Math.max(0, (window.innerWidth - 375) / (1024 - 375)));
            setStartBottom(-264 + t * (-360 + 264));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // ── Scroll progress (drives the entire animation) ───────────────────
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // ── Stage 1: Flap opens (0 → 35%) ──────────────────────────────────
    const flapRotateX = useTransform(scrollYProgress, [0, 0.35], [0, 180]);
    const flapZIndex = useTransform(scrollYProgress, [0, 0.1, 0.35], [3, 0, 0]);

    // ── Stage 2: Letter pops UP out of pocket (35 → 55%) ────────────────
    // ── Stage 3: Letter centers on viewport while scaling (55 → 95%) ────
    const letterBottom = useTransform(
        scrollYProgress,
        [0, 0.35, 0.55, 0.70, 0.90, 0.95],
        [startBottom, startBottom, 0, 0, finalBottom, finalBottom]
    );
    const letterScale = useTransform(
        scrollYProgress,
        [0, 0.35, 0.55, 0.70, 0.85, 0.95],
        [0.15, 0.15, 0.20, 0.45, 0.75, 1.0]
    );
    const letterZIndex = useTransform(
        scrollYProgress,
        [0, 0.34, 0.65, 0.99],
        [1, 1, 1, 40]
    );

    // ── Scroll hint fades early ─────────────────────────────────────────
    const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);

    // ── Scroll context transition ───────────────────────────────────────
    // When the letter fully covers the viewport, let users scroll inside it.
    // When they scroll back to the top of the letter and keep scrolling up,
    // hand control back to the page so the envelope animation reverses.
    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (value >= 0.98 && !isLetterFullyOpen) {
            setIsLetterFullyOpen(true);
        } else if (value < 0.95 && isLetterFullyOpen) {
            setIsLetterFullyOpen(false);
        }
    });

    // When the letter is open and user scrolls up at scrollTop=0,
    // lock the letter so the next scroll event goes to the page.
    const handleLetterWheel = useCallback((e: WheelEvent) => {
        const el = letterContainerRef.current;
        if (!el) return;
        if (e.deltaY < 0 && el.scrollTop <= 0) {
            setIsLetterFullyOpen(false);
        }
    }, []);

    const handleLetterTouchStart = useCallback((e: TouchEvent) => {
        const el = letterContainerRef.current;
        if (el) (el as any)._touchStartY = e.touches[0].clientY;
    }, []);

    const handleLetterTouchMove = useCallback((e: TouchEvent) => {
        const el = letterContainerRef.current;
        if (!el) return;
        const startY = (el as any)._touchStartY ?? 0;
        const deltaY = startY - e.touches[0].clientY;
        // Swiping down (deltaY < 0) while at top → close
        if (deltaY < -10 && el.scrollTop <= 0) {
            setIsLetterFullyOpen(false);
        }
    }, []);

    useEffect(() => {
        const el = letterContainerRef.current;
        if (!el) return;
        if (isLetterFullyOpen) {
            el.addEventListener('wheel', handleLetterWheel, { passive: true });
            el.addEventListener('touchstart', handleLetterTouchStart, { passive: true });
            el.addEventListener('touchmove', handleLetterTouchMove, { passive: true });
        }
        return () => {
            el.removeEventListener('wheel', handleLetterWheel);
            el.removeEventListener('touchstart', handleLetterTouchStart);
            el.removeEventListener('touchmove', handleLetterTouchMove);
        };
    }, [isLetterFullyOpen, handleLetterWheel, handleLetterTouchStart, handleLetterTouchMove]);

    return (
        <div className="container" ref={containerRef}>
            <div className="envelope-wrapper">
                <div className="envelope">
                    {/* Flap with 3D rotation */}
                    <motion.div
                        className="flap"
                        style={{
                            rotateX: flapRotateX,
                            zIndex: flapZIndex,
                            transformOrigin: "top center"
                        }}
                    />
                    <div className="pocket" />

                    {/* Letter — inside envelope, behind pocket initially */}
                    <motion.div
                        ref={letterContainerRef}
                        className="letter-container"
                        style={{
                            bottom: letterBottom,
                            scale: letterScale,
                            zIndex: letterZIndex,
                            overflowY: isLetterFullyOpen ? 'auto' : 'hidden',
                            pointerEvents: isLetterFullyOpen ? 'auto' : 'none',
                        }}
                    >
                        <Invitation heroRef={letterRef} containerRef={containerRef} guest={guest} code={code} />
                    </motion.div>

                    {/* Wax seal — top half rotates with flap */}
                    <motion.div
                        className="seal-half seal-half--top"
                        style={{
                            rotateX: flapRotateX,
                            zIndex: flapZIndex,
                            transformOrigin: "top center"
                        }}
                    >
                        <WaxSealContent />
                    </motion.div>

                    {/* Wax seal — bottom half stays on envelope */}
                    <div className="seal-half seal-half--bottom">
                        <WaxSealContent />
                    </div>
                </div>

                {/* Scroll hint below envelope */}
                <motion.div
                    className="envelope-scroll-hint"
                    style={{ opacity: scrollHintOpacity }}
                >
                    <ScrollHint variant="dark" text="Deslizá para abrir" />
                </motion.div>
            </div>
        </div>
    );
}
