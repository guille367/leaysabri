
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './WeddingEnvelope.scss';

export default function WeddingEnvelope() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Flap animation: 0% to 40% of scroll
    const flapRotateX = useTransform(scrollYProgress, [0, 0.4], [0, 180]);
    const flapZIndex = useTransform(scrollYProgress, [0, 0.39, 0.4], [2, 2, 0]);

    // Letter animation: 40% to 100% of scroll
    const letterBottom = useTransform(scrollYProgress, [0.4, .6, .8, 1], [0, 300, 150, 0]);
    const letterScale = useTransform(scrollYProgress, [0.4, .6, .8, 1], [1, 1.25, 1.5, 2]);
    const letterZIndex = useTransform(scrollYProgress, [0.5, 1], [0, 10]);

    const heartRotate = useTransform(scrollYProgress, [0, .2], ['45deg', '90deg']);

    return (
        <div className="container" ref={containerRef}>
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
                        className="letter"
                        style={{
                            bottom: letterBottom,
                            scale: letterScale,
                            zIndex: letterZIndex
                        }}
                    >
                        <div className="text">
                            <strong>Dear Person.</strong>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Numquam labore omnis minus maiores laboriosam, facere in beatae esse.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className="heart" style={{ rotate: heartRotate }}></motion.div>
                </motion.div>
            </div>
        </div>
    );
}
