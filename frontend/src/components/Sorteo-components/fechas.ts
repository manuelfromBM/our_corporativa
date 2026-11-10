// Cierre del sorteo: la burbuja de tiempo y el nav lo usan para saber si sigue abierto.
export const CIERRE_SORTEO = new Date("2026-11-20T23:59:59-03:00");

export const sorteoAbierto = (ahora = new Date()) => ahora.getTime() < CIERRE_SORTEO.getTime();
