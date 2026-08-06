import { useEffect, useRef } from 'react';
import TOOL_ICONS from '../data/tool-icons.json';

const SPEED = 32; // px/sec
const RESUME_DELAY = 1400; // ms after user interaction ends before auto-scroll resumes

function ToolIcon({ icon }) {
	return (
		<div className="marquee-icon" role="img" aria-label={icon.title}>
			<svg viewBox="0 0 24 24" style={{ '--brand': `#${icon.hex}` }}>
				<path d={icon.path} />
			</svg>
			<span className="marquee-icon-label">{icon.title}</span>
		</div>
	);
}

export default function ToolMarquee() {
	const trackRef = useRef(null);
	const pausedUntil = useRef(0);
	const dragging = useRef(false);

	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		const el = trackRef.current;
		if (!el) return;

		// content is tripled, so one "set" worth of scroll can be wrapped
		// seamlessly without the user ever seeing the reset
		const setWidth = el.scrollWidth / 3;
		el.scrollLeft = setWidth;

		let raf;
		let last = performance.now();
		const tick = (now) => {
			const dt = (now - last) / 1000;
			last = now;
			if (!dragging.current && now > pausedUntil.current) {
				el.scrollLeft += SPEED * dt;
				if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
				else if (el.scrollLeft <= 0) el.scrollLeft += setWidth;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		const markInteraction = () => { pausedUntil.current = performance.now() + RESUME_DELAY; };
		const onPointerDown = () => { dragging.current = true; markInteraction(); };
		const onPointerUp = () => { dragging.current = false; markInteraction(); };

		el.addEventListener('wheel', markInteraction, { passive: true });
		el.addEventListener('touchstart', onPointerDown, { passive: true });
		el.addEventListener('touchend', onPointerUp, { passive: true });
		el.addEventListener('pointerdown', onPointerDown);
		window.addEventListener('pointerup', onPointerUp);

		return () => {
			cancelAnimationFrame(raf);
			el.removeEventListener('wheel', markInteraction);
			el.removeEventListener('touchstart', onPointerDown);
			el.removeEventListener('touchend', onPointerUp);
			el.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('pointerup', onPointerUp);
		};
	}, []);

	return (
		<div className="marquee" role="list" aria-label="Tools and platforms" ref={trackRef}>
			<div className="marquee-track">
				{[...TOOL_ICONS, ...TOOL_ICONS, ...TOOL_ICONS].map((icon, i) => (
					<div role="listitem" key={`${icon.slug}-${i}`} aria-hidden={i >= TOOL_ICONS.length}>
						<ToolIcon icon={icon} />
					</div>
				))}
			</div>
		</div>
	);
}
