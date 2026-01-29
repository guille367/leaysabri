
import { useRef } from 'react';
import './WeddingEnvelope.scss';

export default function WeddingEnvelope() {
    const envelope = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        envelope.current?.classList.toggle('flap');
    };

    return (
        <div className="container">
            <div className="envelope-wrapper" ref={envelope} onClick={handleOpen}>
                <div className="envelope">
                    <div className="letter">
                        <div className="text">
                            <strong>Dear Person.</strong>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Numquam labore omnis minus maiores laboriosam, facere in beatae esse.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="heart"></div>
            </div>
        </div>
    );
}
