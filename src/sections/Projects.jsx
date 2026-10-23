import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { PROJECTS, FILTERS } from '../data/content.js';

const TILT_RANGE = 7; // degrees
const SCROLL_SPEED = 1.35; // px the track moves per px of page scroll

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

function ProjectCard({ p, i }) {
	const Media = p.url ? 'a' : 'div';
	return (
		<TiltCard
			className="proj-card"
			initial={{ opacity: 0, y: 16, scale: .97 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: .4, delay: (i % 6) * .04, ease: [0.19, 1, 0.22, 1] }}
		>
			<Media
				className="proj-card-media"
				{...(p.url ? { href: p.url, target: '_blank', rel: 'noopener', 'aria-label': `${p.t} on GitHub` } : {})}
			>
				<span className="cat-tag proj-card-badge">{p.cat}</span>
				{p.img ? (
					<img src={`/images/${p.img}`} alt={p.t} loading="eager" draggable="false" />
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
				<div className="proj-links">
					{p.demo && (
						<a className="proj-link" href={p.demo} target="_blank" rel="noopener">
							Live demo <Icon name="external" size={14} strokeOnly />
						</a>
					)}
					{p.url ? (
						<a className="proj-link" href={p.url} target="_blank" rel="noopener">
							View on GitHub <Icon name="external" size={14} strokeOnly />
						</a>
					) : (
						<span className="proj-link proj-link-static">Client project, code private</span>
					)}
				</div>
			</div>
		</TiltCard>
	);
}

function Filters({ filter, setFilter }) {
	return (
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
	);
}

/* Pinned scroll-driven row only where it feels right: a wide screen with a
   mouse/trackpad and no reduced-motion preference. Everywhere else the same
   cards sit in a native swipeable row. */
const WIDE_QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)';

function useScrollDriven() {
	const reduce = useReducedMotion();
	// read the query synchronously so the section never swaps variants after mount
	// (the navbar's scroll-spy holds a reference to the first #projects element)
	const [wide, setWide] = useState(() => window.matchMedia(WIDE_QUERY).matches);
	useEffect(() => {
		const mq = window.matchMedia(WIDE_QUERY);
		const update = () => setWide(mq.matches);
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);
	return wide && !reduce;
}

function PinnedRow({ list, filter, setFilter }) {
	const outerRef = useRef(null);
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const distance = useMotionValue(0);
	const [scrollLen, setScrollLen] = useState(0);

	const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
	const x = useTransform(() => -scrollYProgress.get() * distance.get());
	const barScale = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: .001 });

	const measure = useCallback(() => {
		const track = trackRef.current;
		const vp = viewportRef.current;
		if (!track || !vp) return;
		const d = Math.max(0, track.scrollWidth - vp.clientWidth);
		distance.set(d);
		setScrollLen(Math.round(d / SCROLL_SPEED));
	}, [distance]);

	useLayoutEffect(() => { measure(); }, [measure, list]);

	useEffect(() => {
		const ro = new ResizeObserver(measure);
		if (trackRef.current) ro.observe(trackRef.current);
		window.addEventListener('resize', measure);
		return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
	}, [measure]);

	return (
		<section
			className="section projects-pinned"
			id="projects"
			ref={outerRef}
			style={{ height: `calc(100vh + ${scrollLen}px)` }}
		>
			<div className="pin-stage">
				<div className="pin-head">
					<SectionHead eyebrow="Portfolio" title="Featured projects" />
					<Filters filter={filter} setFilter={setFilter} />
				</div>

				<div className="pin-viewport" ref={viewportRef}>
					<motion.div className="pin-track" ref={trackRef} style={{ x }} key={filter}>
						{list.map((p, i) => <ProjectCard key={p.t} p={p} i={i} />)}
					</motion.div>
				</div>

				<div className="pin-foot" aria-hidden="true">
					<span className="eyebrow">Keep scrolling to move through the projects</span>
					<div className="pin-bar"><motion.span style={{ scaleX: barScale }} /></div>
				</div>
			</div>
		</section>
	);
}

function SwipeRow({ list, filter, setFilter }) {
	return (
		<section className="section projects-swipe" id="projects">
			<SectionHead eyebrow="Portfolio" title="Featured projects" />
			<Filters filter={filter} setFilter={setFilter} />
			<div className="swipe-row" key={filter} tabIndex={0} aria-label="Projects, scroll sideways">
				{list.map((p, i) => <ProjectCard key={p.t} p={p} i={i} />)}
			</div>
			<span className="eyebrow swipe-hint" aria-hidden="true">Swipe to see more</span>
		</section>
	);
}

export default function Projects() {
	const [filter, setFilter] = useState('All');
	const pinned = useScrollDriven();

	const list = useMemo(
		() => (filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)),
		[filter]
	);

	return pinned
		? <PinnedRow list={list} filter={filter} setFilter={setFilter} />
		: <SwipeRow list={list} filter={filter} setFilter={setFilter} />;
}
