import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { PROJECTS, FILTERS } from '../data/content.js';

const TILT_RANGE = 7; // degrees

function TiltCard({ children, ...motionProps }) {
	const ref = useRef(null);
	const reduce = useReducedMotion();
	const rx = useMotionValue(0);
	const ry = useMotionValue(0);
	const lift = useMotionValue(0);
	const srx = useSpring(rx, { stiffness: 260, damping: 22 });
	const sry = useSpring(ry, { stiffness: 260, damping: 22 });
	const slift = useSpring(lift, { stiffness: 260, damping: 24 });

	const canTilt = () => !reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	const handleMove = (e) => {
		if (!canTilt()) return;
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - .5;
		const py = (e.clientY - rect.top) / rect.height - .5;
		ry.set(px * TILT_RANGE * 2);
		rx.set(-py * TILT_RANGE * 2);
	};
	const handleEnter = () => { if (canTilt()) lift.set(18); };
	const handleLeave = () => { rx.set(0); ry.set(0); lift.set(0); };

	return (
		<motion.article
			ref={ref}
			{...motionProps}
			style={{ rotateX: srx, rotateY: sry, z: slift, transformPerspective: 900 }}
			onPointerMove={handleMove}
			onPointerEnter={handleEnter}
			onPointerLeave={handleLeave}
		>
			{children}
		</motion.article>
	);
}

export default function Projects() {
	const [filter, setFilter] = useState('All');

	const list = useMemo(
		() => (filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)),
		[filter]
	);

	return (
		<section className="section" id="projects">
			<SectionHead eyebrow="Portfolio" title="Featured projects" />

			<div className="proj-filters" role="tablist" aria-label="Filter projects by category">
				{FILTERS.map(f => (
					<button
						key={f}
						role="tab"
						aria-selected={filter === f}
						className={filter === f ? 'pf active' : 'pf'}
						onClick={() => setFilter(f)}
					>
						{filter === f && (
							<motion.span
								layoutId="pf-active-bg"
								className="pf-active-bg"
								transition={{ type: 'spring', stiffness: 420, damping: 38 }}
							/>
						)}
						<span className="pf-label">{f}</span>
						<span className="pf-count">{f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.cat === f).length}</span>
					</button>
				))}
			</div>

			<div className="proj-grid">
				<AnimatePresence mode="popLayout">
					{list.map((p, i) => {
						const Media = p.url ? 'a' : 'div';
						return (
							<TiltCard
								className="proj-card"
								key={p.t}
								layout
								initial={{ opacity: 0, y: 16, scale: .97 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, scale: .96, transition: { duration: .2, ease: [0.65, 0, 0.35, 1] } }}
								transition={{ duration: .4, delay: (i % 6) * .04, ease: [0.19, 1, 0.22, 1] }}
							>
								<Media
									className="proj-card-media"
									{...(p.url ? { href: p.url, target: '_blank', rel: 'noopener', 'aria-label': `${p.t} on GitHub` } : {})}
								>
									<span className="cat-tag proj-card-badge">{p.cat}</span>
									{p.img ? (
										<img src={`/images/${p.img}`} alt={p.t} loading="lazy" />
									) : (
										<div className="proj-card-noimg">
											<span>{p.t}</span>
										</div>
									)}
								</Media>
								<div className="proj-card-body">
									<h3>{p.url ? <a href={p.url} target="_blank" rel="noopener">{p.t}</a> : p.t}</h3>
									<p>{p.d}</p>
									<div className="proj-tags">
										{p.stack.map(s => <span key={s} className="proj-tag">{s}</span>)}
									</div>
									{p.url ? (
										<a className="proj-link" href={p.url} target="_blank" rel="noopener">
											View on GitHub <Icon name="external" size={14} strokeOnly />
										</a>
									) : (
										<span className="proj-link proj-link-static">Client project, code private</span>
									)}
								</div>
							</TiltCard>
						);
					})}
				</AnimatePresence>
			</div>
		</section>
	);
}
