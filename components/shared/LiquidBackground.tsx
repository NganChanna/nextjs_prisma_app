"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LiquidBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background selection:bg-primary/30">
            {/* Primary Top Left Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px]"
            />

            {/* Secondary Bottom Right Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -50, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[150px]"
            />

            {/* Subtle Center Orbs */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-blue-500/10 blur-[100px]"
            />

            {/* Grid overlay to give it a tech/glass vibe */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"
            />
        </div>
    );
}
