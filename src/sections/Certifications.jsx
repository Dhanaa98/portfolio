import { motion } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { CERTS } from '../data/content.js';

export default function Certifications() {
	return (
		<section className="section" id="certifications">
			<SectionHead eyebrow="Credentials" title="Certifications" />

			<ul className="cert-list-standalone">
				{CERTS.map((c, i) => (
					<motion.li
						key={c}
						initial={{ opacity: 0, y: 14 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '0px 0px -10% 0px' }}
						transition={{ duration: .5, delay: i * .05, ease: [0.19, 1, 0.22, 1] }}
					>
						<Icon name="check" size={16} strokeOnly />
						{c}
					</motion.li>
				))}
			</ul>
		</section>
	);
}
