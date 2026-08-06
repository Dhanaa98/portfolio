import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import Magnetic from '../components/Magnetic.jsx';
import { ROLES, INFO } from '../data/content.js';

function useTyped() {
	const [text, setText] = useState('');
	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) { setText(ROLES[0]); return; }
		let ri = 0, ci = 0, deleting = false, t;
		const tick = () => {
			const word = ROLES[ri];
			setText(deleting ? word.slice(0, ci--) : word.slice(0, ci++));
			if (!deleting && ci === word.length + 1) { deleting = true; t = setTimeout(tick, 1500); return; }
			if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % ROLES.length; }
			t = setTimeout(tick, deleting ? 40 : 78);
		};
		tick();
		return () => clearTimeout(t);
	}, []);
	return text;
}

export default function Intro() {
	const reduce = useReducedMotion();
	const typed = useTyped();
	const v = {
		hidden: { opacity: 0, y: reduce ? 0 : 18 },
		show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .6, ease: [0.19, 1, 0.22, 1], delay: i * .08 } }),
	};

	return (
		<section className="section intro" id="intro">
			<motion.div className="intro-role" initial="hidden" whileInView="show" viewport={{ once: true }} custom={0} variants={v}>
				<div className="role">{typed}<span className="cursor" aria-hidden="true"></span></div>
			</motion.div>

			<motion.h1 className="intro-name" initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} variants={v}>
				Dhananjaya Mudunkotuwa
			</motion.h1>

			<div className="intro-grid">
				<div className="intro-copy">
					<motion.h2 className="intro-lead" initial="hidden" whileInView="show" viewport={{ once: true }} custom={2} variants={v}>
						I build machine learning models and the dashboards that put them
						in front of people who act on them.
					</motion.h2>

					<motion.p className="intro-body" initial="hidden" whileInView="show" viewport={{ once: true }} custom={3} variants={v}>
						I work across the full data science stack: Python and SQL for modeling
						and analysis, Power BI and Looker Studio for what stakeholders see, and
						machine learning spanning classical models, NLP, and time-series forecasting
						for the harder prediction problems. I've also built cloud-based data pipelines
						on GCP that pull together large, disparate data sources into something usable.
						I also build automation workflows that keep reporting fed without manual
						work, whether for internal use or end-to-end client-facing systems.
						Currently applying all of this at Hype Invention.
					</motion.p>

					<motion.div className="intro-actions" initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} variants={v}>
						<a href="#projects" className="btn-solid">
							<Magnetic>
								View projects <Icon name="arrow" size={16} strokeOnly />
							</Magnetic>
						</a>
						<a href="/Dhananjaya Mudunkotuwa.pdf" target="_blank" rel="noopener" className="btn-line">
							<Magnetic>Download CV</Magnetic>
						</a>
					</motion.div>

					<motion.ul
						className="intro-info"
						initial="hidden" whileInView="show" viewport={{ once: true }} custom={5} variants={v}
					>
						{INFO.map(item => (
							<li key={item.k}>
								<span className="eyebrow">{item.k}</span>
								{item.href ? (
									<a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener">{item.v}</a>
								) : (
									<span>{item.v}</span>
								)}
							</li>
						))}
					</motion.ul>
				</div>

				<motion.div
					className="intro-portrait-wrap"
					initial={{ opacity: 0, y: reduce ? 0 : 22 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: .7, ease: [0.19, 1, 0.22, 1], delay: .12 }}
				>
					<div className="intro-portrait">
						<img src="/images/DhanaEdit.jpg" alt="Dhananjaya Mudunkotuwa" />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
