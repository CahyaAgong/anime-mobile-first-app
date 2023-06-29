const breakpoints = [280, 360, 576, 768, 992, 1200];

export const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
