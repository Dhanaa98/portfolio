import { motion } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Magnetic from '../components/Magnetic.jsx';
import { INFO, SOCIALS } from '../data/content.js';

export default function Contact() {
	const year = new Date().getFullYear();
	return (
		<section className="section contact" id="contact">
			<SectionHead eyebrow="Get in touch" eyebrowClassName="signal" title="Let's build something with data" />

			<p className="contact-lead">
				Have a project, a role, or a question about a model or pipeline
				I've built? My inbox is open.
			</p>

			<motion.a
				href="mailto:dhananjayamudunkotuwa1998@gmail.com"
				className="btn-solid contact-cta"
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: .5, ease: [0.19, 1, 0.22, 1] }}
			>
				<Magnetic>
					Say hello <Icon name="arrow" size={16} strokeOnly />
				</Magnetic>
			</motion.a>

			<dl className="contact-info">
				{INFO.map(item => (
					<div className="contact-info-row" key={item.k}>
						<dt className="eyebrow">{item.k}</dt>
						{item.href ? <dd><a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener">{item.v}</a></dd> : <dd>{item.v}</dd>}
					</div>
				))}
			</dl>

			<footer className="site-footer">
				<span className="eyebrow">© {year} Dhananjaya Mudunkotuwa</span>
				<div className="footer-socials">
					{SOCIALS.map(s => (
						<a key={s.label} href={s.url} target="_blank" rel="noopener" aria-label={s.label}>
							<Icon name={s.icon} size={15} />
						</a>
					))}
				</div>
			</footer>
		</section>
	);
}
