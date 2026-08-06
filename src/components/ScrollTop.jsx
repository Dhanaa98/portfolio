import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon.jsx';

export default function ScrollTop() {
	const [visible, setVisible] = useState(false);
	const reduce = useReducedMotion();

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > window.innerHeight * .8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					className="scroll-top"
					aria-label="Back to top"
					onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
					initial={{ opacity: 0, y: 12, scale: .9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 12, scale: .9 }}
					whileHover={{ y: -2 }}
					whileTap={{ scale: .92 }}
					transition={{ duration: .25, ease: [0.19, 1, 0.22, 1] }}
				>
					<Icon name="arrow" size={16} strokeOnly className="scroll-top-icon" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
