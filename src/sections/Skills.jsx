import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead.jsx';
import ToolMarquee from '../components/ToolMarquee.jsx';
import { SKILLS } from '../data/content.js';

export default function Skills() {
	return (
		<section className="section" id="skills">
			<SectionHead eyebrow="Toolkit" title="What I build with" />

			<div className="skills-list">
				{SKILLS.map((group, gi) => (
					<motion.div
						className="skill-row"
						key={group.key}
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '0px 0px -10% 0px' }}
						transition={{ duration: .5, delay: gi * .04, ease: [0.19, 1, 0.22, 1] }}
					>
						<h3 className="skill-title">{group.title}</h3>
						<div className="skill-chips">
							{group.items.map(item => <span className="skill-chip" key={item}>{item}</span>)}
						</div>
					</motion.div>
				))}
			</div>

			<motion.div
				className="skills-tools"
				initial={{ opacity: 0, y: 14 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '0px 0px -10% 0px' }}
				transition={{ duration: .5, ease: [0.19, 1, 0.22, 1] }}
			>
				<ToolMarquee />
			</motion.div>
		</section>
	);
}
