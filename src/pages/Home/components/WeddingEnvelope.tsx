
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Letter from '@components/Letter';

export default function WeddingEnvelope() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchParams.get('from') === 'invitation') {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [searchParams]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {

        if (latest >= 0.99 && searchParams.get('from') !== 'invitation') {
            navigate('/invitation');
        }

        if (latest > 0.9 && latest < 0.95) {
            searchParams.delete('from');
        }

    });

    // Flap animation: 0% to 40% of scroll
    const flapRotateX = useTransform(scrollYProgress, [0, 0.4], [0, 180]);
    const flapZIndex = useTransform(scrollYProgress, [0, 0.39, 0.4], [2, 2, 0]);

    // Letter animation: 40% to 100% of scroll
    const letterBottom = useTransform(scrollYProgress, [0.4, .6, .8, 1], [0, 300, 150, 0]);
    const letterScale = useTransform(scrollYProgress, [0.4, .6, .8, 1], [1, 1.25, 1.5, 2.3]);
    const letterZIndex = useTransform(scrollYProgress, [0.5, 1], [0, 10]);

    const heartRotate = useTransform(scrollYProgress, [0, .2], ['45deg', '90deg']);

    return (
        <div className="container" ref={containerRef} style={{ bottom: "0" }}>
            <div className="envelope-wrapper">
                <motion.div className="envelope" >
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
                        className="letter-container"
                        style={{
                            bottom: letterBottom,
                            scale: letterScale,
                            zIndex: letterZIndex
                        }}
                    >
                        <Letter />
                    </motion.div>
                    <motion.div className="heart" style={{ rotate: heartRotate }}></motion.div>
                </motion.div>
            </div>
        </div>
    );
}
