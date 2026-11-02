import { ValoresRegistro } from "./campos";

// Payload en snake_case, alineado con el formato que ya usa /api/contactosorteo.
export function construirPayload(v: ValoresRegistro) {
    const tieneSitio = v.tieneSitio === "Sí";
    return {
        nombre_completo: v.nombreCompleto.trim(),
        correo: v.correo.trim().toLowerCase(),
        usuario_instagram: v.instagram.trim().replace(/^@/, ""),
        comuna: v.comuna.trim(),
        nombre_negocio: v.nombreNegocio.trim(),
        rubro: v.rubro,
        negocio_funcionando: v.negocioFuncionando,
        tiene_sitio_web: tieneSitio,
        url_sitio_web: tieneSitio && v.urlSitio.trim() ? v.urlSitio.trim() : null,
        productos_servicios: v.productosServicios.trim() || null,
        objetivo_web: v.objetivoWeb.trim() || null,
        funcionalidades: v.funcionalidades,
        tiene_material: v.tieneMaterial || null,
        motivo_sorteo: v.motivoSorteo.trim() || null,
        confirma_seguimiento: v.sigueInstagram,
        confirma_historia: v.compartioHistoria,
        confirma_etiquetado: v.etiquetoAmigos,
        acepta_bases: v.aceptaBases,
        autoriza_datos: v.autorizaDatos,
    };
}

export type PayloadRegistro = ReturnType<typeof construirPayload>;

// TODO: conectar con el endpoint definitivo cuando esté listo el backend.
// Por ahora solo simula el envío para poder prototipar el flujo.
export async function enviarRegistro(payload: PayloadRegistro): Promise<void> {
    console.log("[registro-sorteo] payload:", payload);
    await new Promise((r) => setTimeout(r, 600));
}
