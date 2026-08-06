import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead.jsx';
import { EXPERIENCE } from '../data/content.js';

export default function Experience() {
	return (
		<section className="section" id="experience">
			<SectionHead eyebrow="Career" title="Where I've applied this" />

			<div className="exp-list">
				{EXPERIENCE.map(job => (
					<article className="exp-row" key={job.role}>
						<div className="exp-when">
							<span className={job.current ? 'exp-dot live' : 'exp-dot'} aria-hidden="true"></span>
							<span className="eyebrow">{job.when}</span>
						</div>
						<div className="exp-main">
							<h3>{job.role}</h3>
							<p className="exp-co">{job.co}</p>
							<ul className="exp-bullets">
								{job.bullets.map((b, i) => (
									<motion.li
										key={i}
										initial={{ opacity: 0, x: -10 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, margin: '0px 0px -10% 0px' }}
										transition={{ duration: .45, delay: i * .05, ease: [0.19, 1, 0.22, 1] }}
									>
										{b}
									</motion.li>
								))}
							</ul>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
