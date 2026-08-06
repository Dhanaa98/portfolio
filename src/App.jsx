import { useEffect, useState } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import ScrollTop from './components/ScrollTop.jsx';
import Intro from './sections/Intro.jsx';
import Experience from './sections/Experience.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import Education from './sections/Education.jsx';
import Certifications from './sections/Certifications.jsx';
import Contact from './sections/Contact.jsx';
import { NAV } from './data/content.js';

function useTheme() {
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))];
}

function useActiveSection(ids) {
	const [active, setActive] = useState(ids[0]);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) setActive(entry.target.id);
				});
			},
			{ rootMargin: '-20% 0px -70% 0px', threshold: 0 }
		);
		ids.forEach(id => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [ids]);
	return active;
}

export default function App() {
	const [theme, toggleTheme] = useTheme();
	const sectionIds = NAV.map(n => n.id);
	const active = useActiveSection(sectionIds);
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: .001 });

	useEffect(() => {
		if (!window.location.hash) return;
		const el = document.getElementById(window.location.hash.slice(1));
		if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
	}, []);

	return (
		<>
			<motion.div className="progress-rule" style={{ scaleX: progress }} />
			<Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={active} />
			<main className="content">
				<Intro />
				<Experience />
				<Projects />
				<Skills />
				<Education />
				<Certifications />
				<Contact />
			</main>
			<ScrollTop />
		</>
	);
}
