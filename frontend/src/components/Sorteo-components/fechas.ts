// Cierre del sorteo: la burbuja de tiempo y el nav lo usan para saber si sigue abierto.
export const CIERRE_SORTEO = new Date("2026-07-19T23:59:59-04:00");

export const sorteoAbierto = (ahora = new Date()) => ahora.getTime() < CIERRE_SORTEO.getTime();
