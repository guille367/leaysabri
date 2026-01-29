import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Letter from "@components/Letter";

export default function Invitation() {
    const navigate = useNavigate();

    useEffect(() => {
        let touchStartY = 0;

        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY < 0) {
                navigate("/?from=invitation");
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            touchStartY = event.touches[0].clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            const touchEndY = event.touches[0].clientY;
            // Detect a downward swipe (which is an upward scroll)
            if (touchEndY > touchStartY + 50) {
                navigate("/?from=invitation");
            }
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [navigate]);

    return (
        <div className="invitation-container">
            <div className="envelope-wrapper">
                <div className="envelope">
                    <div className="letter-container">
                        <Letter />
                    </div>
                </div>
            </div>
        </div>
    );
}
