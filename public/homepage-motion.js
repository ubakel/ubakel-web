(() => {
  'use strict';
  const root = document.documentElement;
  const progress = document.querySelector('.reading-progress');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll('.statement-heading, .capabilities article, .department-heading, .department-panel, .switch-intro, .flow-stage, .work-heading, .projects > article, .approach-heading, .approach-steps article, .support-heading, .support-grid article, .guide-heading, .next-steps li, .buying-questions, .closing-copy');
  // Content remains visible without JavaScript or when motion is paused.
  if ('IntersectionObserver' in window && !media.matches && !root.classList.contains('reduce-motion')) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(target => {
      target.classList.add('reveal-ready');
      observer.observe(target);
    });
  }
  let queued = false;
  const update = () => {
    const distance = root.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    queued = false;
  };
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  addEventListener('resize', update);
  update();
})();
