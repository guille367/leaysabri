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

// function FloralTopLeft() {
//     return (
//         <svg className="envelope-deco envelope-deco--top-left" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <linearGradient id="leafFill1" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#6b8a68" />
//                     <stop offset="100%" stopColor="#4a6648" />
//                 </linearGradient>
//                 <linearGradient id="leafFill2" x1="100%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#5a7a58" />
//                     <stop offset="100%" stopColor="#3d5c3a" />
//                 </linearGradient>
//             </defs>

//             {/* === LEAVES (behind rose) === */}
//             {/* Leaf bottom-left — serrated edge, visible veins */}
//             <path d="M18 118 C22 108, 24 95, 30 82 C33 76, 36 72, 40 68
//                      C36 74, 34 82, 30 92 C28 100, 22 112, 18 118Z"
//                 fill="url(#leafFill2)" stroke="#3a5438" strokeWidth="0.7" />
//             {/* Veins */}
//             <path d="M19 116 C24 104, 28 90, 36 76" stroke="#3a5438" strokeWidth="0.6" fill="none" opacity="0.5" />
//             <path d="M23 110 C26 104, 28 98, 30 92" stroke="#3a5438" strokeWidth="0.4" fill="none" opacity="0.35" />
//             <path d="M27 100 C30 94, 32 88, 34 82" stroke="#3a5438" strokeWidth="0.4" fill="none" opacity="0.3" />
//             <path d="M24 106 L20 102" stroke="#3a5438" strokeWidth="0.3" fill="none" opacity="0.25" />
//             <path d="M28 96 L24 93" stroke="#3a5438" strokeWidth="0.3" fill="none" opacity="0.25" />
//             <path d="M31 88 L27 86" stroke="#3a5438" strokeWidth="0.3" fill="none" opacity="0.25" />

//             {/* Leaf left — larger */}
//             <path d="M10 90 C12 78, 18 65, 28 55
//                      C24 65, 18 76, 14 86 C12 90, 10 92, 10 90Z"
//                 fill="url(#leafFill1)" stroke="#3a5438" strokeWidth="0.7" />
//             <path d="M11 88 C16 76, 22 64, 28 56" stroke="#3a5438" strokeWidth="0.5" fill="none" opacity="0.45" />
//             <path d="M14 82 L11 79" stroke="#3a5438" strokeWidth="0.3" fill="none" opacity="0.25" />
//             <path d="M18 74 L15 72" stroke="#3a5438" strokeWidth="0.3" fill="none" opacity="0.25" />
//             <path d="M22 66 L19 64" stroke="#3a5438" strokeWidth="0.3" fill="none" opacity="0.25" />

//             {/* === MAIN ROSE — outlined petal illustration style === */}
//             {/* Outermost petals */}
//             <path d="M30 62 C28 52, 35 40, 50 36 C46 44, 44 52, 46 60 C40 62, 34 64, 30 62Z"
//                 fill="#f5eeed" stroke="#c4b0b0" strokeWidth="0.8" />
//             <path d="M70 58 C74 50, 70 40, 58 34 C60 42, 58 50, 54 58 C60 60, 66 60, 70 58Z"
//                 fill="#f2eae9" stroke="#c4b0b0" strokeWidth="0.8" />
//             <path d="M28 76 C24 68, 28 58, 38 52 C38 58, 36 66, 34 74 C32 76, 28 78, 28 76Z"
//                 fill="#f0e8e6" stroke="#c4b0b0" strokeWidth="0.8" />
//             <path d="M72 72 C76 66, 74 56, 64 50 C62 56, 62 64, 64 72 C68 74, 72 74, 72 72Z"
//                 fill="#ede4e2" stroke="#c4b0b0" strokeWidth="0.8" />
//             <path d="M34 82 C32 76, 38 68, 48 64 C46 70, 44 76, 42 80 C38 82, 34 84, 34 82Z"
//                 fill="#f5eeed" stroke="#c4b0b0" strokeWidth="0.7" />
//             <path d="M66 80 C68 74, 64 66, 54 62 C54 68, 56 74, 58 78 C62 80, 66 82, 66 80Z"
//                 fill="#f2eae9" stroke="#c4b0b0" strokeWidth="0.7" />

//             {/* Mid petals — tighter */}
//             <path d="M36 56 C38 48, 44 42, 52 42 C50 48, 50 54, 52 58 C46 58, 40 58, 36 56Z"
//                 fill="#f7f0ef" stroke="#c8b4b4" strokeWidth="0.7" />
//             <path d="M64 54 C62 48, 56 42, 48 42 C50 48, 50 54, 48 58 C54 56, 60 56, 64 54Z"
//                 fill="#f4eceb" stroke="#c8b4b4" strokeWidth="0.7" />
//             <path d="M36 68 C34 62, 38 54, 46 50 C46 56, 44 62, 42 66 C40 68, 36 70, 36 68Z"
//                 fill="#f7f0ef" stroke="#c8b4b4" strokeWidth="0.7" />
//             <path d="M64 66 C66 60, 62 54, 54 50 C54 56, 56 62, 58 66 C60 68, 64 68, 64 66Z"
//                 fill="#f4eceb" stroke="#c8b4b4" strokeWidth="0.7" />

//             {/* Inner petals — spiral */}
//             <path d="M42 52 C44 48, 48 46, 52 48 C50 50, 50 54, 52 56 C48 56, 44 54, 42 52Z"
//                 fill="#f9f4f3" stroke="#d0bebe" strokeWidth="0.6" />
//             <path d="M58 52 C56 48, 52 46, 48 48 C50 50, 50 54, 48 56 C52 54, 56 54, 58 52Z"
//                 fill="#f6efee" stroke="#d0bebe" strokeWidth="0.6" />
//             <path d="M44 60 C44 56, 46 52, 50 50 C50 54, 48 58, 46 60 C44 62, 44 62, 44 60Z"
//                 fill="#f9f4f3" stroke="#d0bebe" strokeWidth="0.6" />
//             <path d="M56 58 C56 54, 54 52, 50 50 C50 54, 52 58, 54 60 C56 60, 56 60, 56 58Z"
//                 fill="#f6efee" stroke="#d0bebe" strokeWidth="0.6" />

//             {/* Center spiral */}
//             <path d="M48 52 C48 50, 50 48, 52 50 C53 52, 52 54, 50 54 C48 54, 47 53, 48 52Z"
//                 fill="#f0e6e4" stroke="#ccb8b8" strokeWidth="0.5" />
//             <path d="M49 51 C50 50, 51 50, 51 51 C51.5 52, 51 52.5, 50 52.5 C49 52.5, 48.5 52, 49 51Z"
//                 fill="#ecdcda" stroke="#c8b4b4" strokeWidth="0.4" />
//             <ellipse cx="50" cy="51.5" rx="1" ry="0.8" fill="#e4d2d0" />

//             {/* === Baby's breath cluster (right side) === */}
//             {/* Stems */}
//             <path d="M68 48 Q80 38 92 26" stroke="#7a9a70" strokeWidth="0.7" fill="none" />
//             <path d="M70 52 Q84 42 98 34" stroke="#7a9a70" strokeWidth="0.6" fill="none" />
//             <path d="M72 56 Q88 48 104 42" stroke="#7a9a70" strokeWidth="0.5" fill="none" />
//             <path d="M68 44 Q76 34 84 22" stroke="#7a9a70" strokeWidth="0.6" fill="none" />
//             {/* Flower clusters — small 5-dot petal groups */}
//             {/* Cluster 1 */}
//             <circle cx="92" cy="24" r="3" fill="#ffffff" stroke="#ddd8d0" strokeWidth="0.3" />
//             <circle cx="88" cy="22" r="2.2" fill="#fefefe" stroke="#ddd8d0" strokeWidth="0.3" />
//             <circle cx="94" cy="20" r="2" fill="#ffffff" opacity="0.9" />
//             {/* Cluster 2 */}
//             <circle cx="98" cy="32" r="3.2" fill="#ffffff" stroke="#ddd8d0" strokeWidth="0.3" />
//             <circle cx="95" cy="30" r="2" fill="#fefefe" stroke="#ddd8d0" strokeWidth="0.3" />
//             <circle cx="100" cy="28" r="1.8" fill="#ffffff" opacity="0.85" />
//             {/* Cluster 3 */}
//             <circle cx="104" cy="40" r="2.8" fill="#ffffff" stroke="#ddd8d0" strokeWidth="0.3" />
//             <circle cx="101" cy="38" r="2" fill="#fefefe" opacity="0.9" />
//             <circle cx="106" cy="36" r="1.5" fill="#ffffff" opacity="0.8" />
//             {/* Cluster 4 — upper */}
//             <circle cx="84" cy="20" r="2.5" fill="#ffffff" stroke="#ddd8d0" strokeWidth="0.3" />
//             <circle cx="82" cy="17" r="1.8" fill="#fefefe" opacity="0.85" />
//             <circle cx="86" cy="16" r="1.5" fill="#ffffff" opacity="0.8" />
//             {/* Centers */}
//             <circle cx="92" cy="24" r="1" fill="#e8e2d8" />
//             <circle cx="98" cy="32" r="1.1" fill="#e8e2d8" />
//             <circle cx="104" cy="40" r="0.9" fill="#e8e2d8" />
//             <circle cx="84" cy="20" r="0.8" fill="#e8e2d8" />

//             {/* === Falling petal === */}
//             <path d="M55 105 C58 100, 60 96, 58 92 C54 96, 52 100, 55 105Z"
//                 fill="#f0e4e2" stroke="#d4c0be" strokeWidth="0.4" opacity="0.55" />

//             {/* === Sparkles === */}
//             <circle cx="96" cy="16" r="0.8" fill="#fff" opacity="0.5" />
//             <circle cx="108" cy="34" r="0.7" fill="#fff" opacity="0.4" />
//         </svg>
//     );
// }

// function FloralTopRight() {
//     return (
//         <svg className="envelope-deco envelope-deco--top-right" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
//             {/* Small branch */}
//             <line x1="20" y1="70" x2="60" y2="20" stroke="#7a6652" strokeWidth="1.5" />
//             <line x1="45" y1="40" x2="70" y2="25" stroke="#7a6652" strokeWidth="1" />
//             {/* Baby's breath clusters */}
//             <circle cx="60" cy="18" r="3.5" fill="#fff" opacity="0.9" />
//             <circle cx="55" cy="12" r="3" fill="#f8f4f4" opacity="0.85" />
//             <circle cx="65" cy="12" r="2.5" fill="#fff" opacity="0.8" />
//             <circle cx="70" cy="22" r="3" fill="#fff" opacity="0.85" />
//             <circle cx="50" cy="20" r="2" fill="#f8f4f4" opacity="0.7" />
//             <circle cx="72" cy="15" r="2" fill="#fff" opacity="0.75" />
//             {/* Small leaves */}
//             <ellipse cx="35" cy="55" rx="8" ry="3.5" fill="#8ba88a" transform="rotate(-55 35 55)" />
//             <ellipse cx="50" cy="35" rx="7" ry="3" fill="#7a9a78" transform="rotate(-40 50 35)" />
//         </svg>
//     );
// }

// function DecorativeHearts() {
//     return (
//         <svg className="envelope-deco envelope-deco--bottom-left" viewBox="0 0 80 42" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 {/* Gradient for puffy 3D heart */}
//                 <radialGradient id="puffyHeart" cx="40%" cy="35%" r="60%">
//                     <stop offset="0%" stopColor="#ffffff" />
//                     <stop offset="40%" stopColor="#f0eded" />
//                     <stop offset="70%" stopColor="#ddd8d8" />
//                     <stop offset="100%" stopColor="#c5bfbf" />
//                 </radialGradient>
//                 {/* Gradient for metallic outline heart */}
//                 <linearGradient id="metallicStroke" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#c0b8b0" />
//                     <stop offset="30%" stopColor="#9a928a" />
//                     <stop offset="60%" stopColor="#b8b0a8" />
//                     <stop offset="100%" stopColor="#8a827a" />
//                 </linearGradient>
//             </defs>
//             {/* Puffy solid heart - ceramic/porcelain look */}
//             <path d="M18 14 C18 8, 10 5, 6 10 C1 16, 3 22, 18 34 C33 22, 35 16, 30 10 C26 5, 18 8, 18 14Z" fill="url(#puffyHeart)" />
//             {/* Shadow under puffy heart */}
//             <ellipse cx="18" cy="33" rx="10" ry="2" fill="#00000010" />
//             {/* Highlight on puffy heart top-left lobe */}
//             <ellipse cx="12" cy="12" rx="4" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-20 12 12)" />
//             {/* Small highlight on right lobe */}
//             <ellipse cx="24" cy="13" rx="2.5" ry="2" fill="#ffffff" opacity="0.3" transform="rotate(15 24 13)" />

//             {/* Metallic wire outline heart - tilted */}
//             <g transform="translate(48, 8) rotate(8)">
//                 <path d="M14 8 C14 3, 7 0, 3 5 C-1 10, 1 15, 14 26 C27 15, 29 10, 25 5 C21 0, 14 3, 14 8Z"
//                     fill="none" stroke="url(#metallicStroke)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//                 {/* Inner highlight line for metallic effect */}
//                 <path d="M14 9 C14 5, 9 3, 6 6.5"
//                     fill="none" stroke="#d0c8c0" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
//             </g>
//         </svg>
//     );
// }

// function DecorativeLeaf() {
//     return (
//         <svg className="envelope-deco envelope-deco--bottom-right" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
//             {/* Main branch */}
//             <path d="M5 45 Q20 30 45 8" stroke="#8a7560" strokeWidth="1.3" fill="none" strokeLinecap="round" />
//             {/* Sub branch */}
//             <path d="M25 28 Q35 22 42 15" stroke="#8a7560" strokeWidth="0.9" fill="none" strokeLinecap="round" />
//             {/* Leaves on main branch */}
//             <path d="M12 38 Q16 32 20 35 Q16 38 12 38Z" fill="#8ba88a" />
//             <path d="M18 33 Q22 27 26 30 Q22 33 18 33Z" fill="#7a9a78" />
//             <path d="M28 24 Q32 18 35 22 Q31 25 28 24Z" fill="#8ba88a" />
//             <path d="M35 18 Q39 12 42 16 Q38 19 35 18Z" fill="#7a9a78" />
//             {/* Leaves on sub branch */}
//             <path d="M30 26 Q34 21 36 25 Q33 27 30 26Z" fill="#8ba88a" opacity="0.8" />
//             {/* Small heart at tip */}
//             <path d="M47 9 C47 7, 45 6, 44 7.5 C43 9, 43 10, 47 14 C51 10, 51 9, 50 7.5 C49 6, 47 7, 47 9Z" fill="#c0b0a0" opacity="0.5" />
//         </svg>
//     );
// }

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

                        {/* Twine */}
                        <div className="twine">
                            <div className="twine__line" />
                            <div className="twine__bow">
                                <div className="twine__bow-loop twine__bow-loop--left" />
                                <div className="twine__bow-loop twine__bow-loop--right" />
                                <div className="twine__bow-knot" />
                            </div>
                        </div>

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
