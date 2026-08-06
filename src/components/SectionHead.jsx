import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHead({ eyebrow, eyebrowClassName = '', title }) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			className="section-head"
			initial={{ opacity: 0, y: reduce ? 0 : 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '0px 0px -15% 0px' }}
			transition={{ duration: .55, ease: [0.19, 1, 0.22, 1] }}
		>
			<span className={`eyebrow${eyebrowClassName ? ` ${eyebrowClassName}` : ''}`}>{eyebrow}</span>
			<h2>{title}</h2>
		</motion.div>
	);
}
