import { useEffect, useRef } from "react";
import gsap from "gsap";
import SweeperCard from "./sweeper-card.jsx";

const SweeperContainer = ({ courses }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const tweenRef = useRef(null);

    // Pair courses into rows: [ [left, right], ... ]
    const pairedRows = [];
    for (let i = 0; i < courses.length; i += 2) {
        pairedRows.push([courses[i], courses[i + 1] || courses[0]]);
    }
    // Duplicate for seamless scrolling
    const doubledRows = [...pairedRows, ...pairedRows];

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        // Calculate the height to move (half the content height for seamless loop)
        const contentHeight = content.scrollHeight;
        const moveDistance = contentHeight / 2;

        // Create the animation with proper distance
        tweenRef.current = gsap.to(content, {
            y: -moveDistance,
            ease: "none",
            duration: 60,
            repeat: -1,
        });

        // Hover pause
        const handleMouseEnter = () => {
            gsap.to(tweenRef.current, { timeScale: 0, duration: 0.3, ease: "power2.out" });
        };
        const handleMouseLeave = () => {
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.3, ease: "power2.out" });
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            if (tweenRef.current) tweenRef.current.kill();
        };
    }, [courses]);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-6xl mx-auto overflow-hidden relative h-[600px] cursor-pointer"
        >
            <div ref={contentRef} className="flex flex-col space-y-6">
                {doubledRows.map((row, i) => (
                    <div
                        key={`row-${i}`}
                        className="grid grid-cols-2 gap-6"
                        style={{
                            // Zig-zag effect: shift every other row
                            transform: i % 2 === 0 ? "translateX(0)" : "translateX(20px)"
                        }}
                    >
                        <SweeperCard course={row[0]} />
                        <SweeperCard course={row[1]} />
                    </div>
                ))}
            </div>

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/10 to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default SweeperContainer;