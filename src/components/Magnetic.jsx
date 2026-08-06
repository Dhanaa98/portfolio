import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

// A magnetic-pull layer: wrap any element's *children* in this to make the
// element visually pull toward the cursor within its own bounds, without
// owning the outer tag — so callers keep control of href/semantics and any
// entrance animation on the outer element (avoids two components fighting
// over the same transform).
export default function Magnetic({ children, strength = 0.35, targetRef }) {
	const localRef = useRef(null);
	const ref = targetRef || localRef;
	const reduce = useReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const spring = useSpring(x, { stiffness: 300, damping: 20 });
	const springY = useSpring(y, { stiffness: 300, damping: 20 });

	if (reduce) return children;

	const handleMove = (e) => {
		const el = ref.current?.closest?.('a, button') || ref.current;
		if (!el) return;
		if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
		const rect = el.getBoundingClientRect();
		const relX = e.clientX - (rect.left + rect.width / 2);
		const relY = e.clientY - (rect.top + rect.height / 2);
		x.set(relX * strength);
		y.set(relY * strength);
	};
	const handleLeave = () => { x.set(0); y.set(0); };

	return (
		<motion.span
			ref={ref}
			className="magnetic-layer"
			style={{ x: spring, y: springY, display: 'inline-flex' }}
			onPointerMove={handleMove}
			onPointerLeave={handleLeave}
		>
			{children}
		</motion.span>
	);
}
