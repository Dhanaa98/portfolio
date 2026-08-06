import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon.jsx';
import { NAV, SOCIALS } from '../data/content.js';

export default function Navbar({ theme, onToggleTheme, activeSection }) {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [pillRect, setPillRect] = useState(null);
	const linksRef = useRef(null);
	const reduce = useReducedMotion();

	useEffect(() => { setOpen(false); }, [activeSection]);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const measure = () => {
			const container = linksRef.current;
			if (!container) return;
			const el = container.querySelector(`a[href="#${activeSection}"]`);
			if (!el) { setPillRect(null); return; }
			const cb = container.getBoundingClientRect();
			const eb = el.getBoundingClientRect();
			setPillRect({ top: eb.top - cb.top, left: eb.left - cb.left, width: eb.width, height: eb.height });
		};
		measure();
		window.addEventListener('resize', measure);
		return () => window.removeEventListener('resize', measure);
	}, [activeSection, open]);

	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia('(max-width: 860px)');
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	// stagger-reveal only applies inside the mobile drawer; on desktop the
	// rail is always fully visible regardless of the `open` toggle state.
	const menuVariants = {
		hidden: { transition: { staggerChildren: .03, staggerDirection: -1 } },
		show: { transition: { staggerChildren: .04, delayChildren: .06 } },
	};
	const itemVariants = isMobile
		? {
			hidden: { opacity: 0, x: reduce ? 0 : 14 },
			show: { opacity: 1, x: 0, transition: { duration: .32, ease: [0.19, 1, 0.22, 1] } },
		}
		: {
			hidden: { opacity: 1, x: 0 },
			show: { opacity: 1, x: 0 },
		};

	return (
		<motion.header
			className={`navbar${scrolled ? ' scrolled' : ''}`}
			initial={{ y: -16, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: .5, ease: [0.19, 1, 0.22, 1] }}
		>
			<div className="navbar-inner">
				<a href="#intro" className="navbar-brand">
					<span className="mark">DM</span>
					<span className="brand-name">Dhananjaya Mudunkotuwa</span>
				</a>

				<nav className={`navbar-links${open ? ' open' : ''}`} aria-label="Section navigation">
					<motion.div
						className="navbar-links-rail"
						ref={linksRef}
						variants={menuVariants}
						initial={false}
						animate={open ? 'show' : 'hidden'}
					>
						{NAV.map(item => (
							<motion.a
								key={item.id}
								href={`#${item.id}`}
								className={activeSection === item.id ? 'active' : ''}
								variants={itemVariants}
							>
								{item.label}
							</motion.a>
						))}
						{pillRect && (
							<motion.span
								className="navbar-active-pill"
								animate={{ top: pillRect.top, left: pillRect.left, width: pillRect.width, height: pillRect.height }}
								transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}
								aria-hidden="true"
							/>
						)}
					</motion.div>
					<div className="navbar-links-socials">
						{SOCIALS.map(s => (
							<a key={s.label} href={s.url} target="_blank" rel="noopener" aria-label={s.label}>
								<Icon name={s.icon} size={16} />
							</a>
						))}
					</div>
				</nav>

				<div className="navbar-tools">
					<button className="theme-btn" onClick={onToggleTheme} aria-label="Toggle color theme">
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={theme}
								className="theme-btn-icon"
								initial={reduce ? false : { opacity: 0, rotate: -60, scale: .6 }}
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 60, scale: .6 }}
								transition={{ duration: .28, ease: [0.19, 1, 0.22, 1] }}
							>
								<Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} strokeOnly />
							</motion.span>
						</AnimatePresence>
					</button>
					<button className="navbar-toggle" aria-label="Toggle navigation" onClick={() => setOpen(o => !o)}>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={open ? 'close' : 'menu'}
								className="theme-btn-icon"
								initial={reduce ? false : { opacity: 0, rotate: -45 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 45 }}
								transition={{ duration: .22, ease: [0.19, 1, 0.22, 1] }}
							>
								<Icon name={open ? 'close' : 'menu'} size={18} strokeOnly />
							</motion.span>
						</AnimatePresence>
					</button>
				</div>
			</div>
		</motion.header>
	);
}
