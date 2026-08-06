import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead.jsx';
import { EDUCATION } from '../data/content.js';

export default function Education() {
	return (
		<section className="section" id="education">
			<SectionHead eyebrow="Background" title="Education" />

			<ol className="edu-list">
				{EDUCATION.map((e, i) => (
					<motion.li
						key={e.title}
						initial={{ opacity: 0, y: 14 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '0px 0px -10% 0px' }}
						transition={{ duration: .5, delay: i * .06, ease: [0.19, 1, 0.22, 1] }}
					>
						<span className="eyebrow edu-year">{e.year}</span>
						<h3>{e.title}</h3>
						<p className="edu-where">{e.where}</p>
						{e.result && <p className="edu-result">{e.result}</p>}
					</motion.li>
				))}
			</ol>
		</section>
	);
}
