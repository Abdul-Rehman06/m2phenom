import React, { useEffect, useMemo, useRef } from 'react';

export const LiquidBackground: React.FC = () => {
    // Generate static random values once per mount to prevent hydration errors
    const blobsData = useMemo(() => {
        return Array.from({ length: 6 }).map(() => ({
            size: Math.random() * 300 + 250,
            left: Math.random() * 80 + 10,
            top: Math.random() * 80 + 10,
            animationDelay: Math.random() * -20,
            animationDuration: Math.random() * 15 + 20,
        }));
    }, []);

    // Keep track of the blob DOM elements for high-performance updates
    const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Apply subtle parallax effect to each blob
            blobRefs.current.forEach((blob, index) => {
                if (blob) {
                    const speed = (index + 1) * 20;
                    blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                }
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-[#f4f6f9] z-0 pointer-events-none">
            <style>{`
                :root {
                    --mercury-light: #ffffff;
                    --filter-goo: url('#gooey-light');
                }
                
                .liquid-stage {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    filter: var(--filter-goo);
                    opacity: 0.9;
                }
                
                .liquid-blob {
                    position: absolute;
                    background: var(--mercury-light);
                    border-radius: 50%;
                    filter: blur(15px);
                    animation: float-light 25s infinite alternate ease-in-out;
                    box-shadow: 
                        inset -10px -10px 30px rgba(0, 0, 0, 0.03),
                        10px 10px 40px rgba(249, 115, 22, 0.08); /* Subtle orange glow matching the theme */
                    transition: transform 0.1s ease-out;
                }
                
                @keyframes float-light {
                    0% { margin-left: 0; margin-top: 0; scale: 1; }
                    33% { margin-left: 15vw; margin-top: 15vh; scale: 1.15; }
                    66% { margin-left: -10vw; margin-top: 10vh; scale: 0.85; }
                    100% { margin-left: 10vw; margin-top: -15vh; scale: 1.1; }
                }
            `}</style>

            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="gooey-light">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Subtle background grid lines to match the screenshot's tech vibe */}
            <div 
                className="absolute inset-0 z-0 opacity-10" 
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="liquid-stage">
                {blobsData.map((data, index) => (
                    <div
                        key={index}
                        ref={(el) => (blobRefs.current[index] = el)}
                        className="liquid-blob"
                        style={{
                            width: `${data.size}px`,
                            height: `${data.size}px`,
                            left: `${data.left}%`,
                            top: `${data.top}%`,
                            animationDelay: `${data.animationDelay}s`,
                            animationDuration: `${data.animationDuration}s`,
                        }}
                    />
                ))}
            </div>
            
            {/* Soft overlay gradient to blend everything smoothly */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-orange-500/5 z-0" />
        </div>
    );
};
