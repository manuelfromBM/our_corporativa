import { DatosFormSorteo } from "./route";

export function emailHtmlAdmin(data: DatosFormSorteo): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
        <tr><td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#161b22;border-radius:12px;overflow:hidden;border:1px solid #30363d;">

            <!-- Header -->
            <tr>
              <td style="background:#1f2937;padding:24px 32px;border-bottom:1px solid #30363d;">
                <p style="margin:0 0 4px;color:#00e5ff;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">BM Code Lab · Sorteo</p>
                <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">🎯 Nueva participación</h1>
              </td>
            </tr>

            <!-- Datos -->
            <tr>
              <td style="padding:24px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0">

                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #21262d;">
                      <p style="margin:0 0 2px;color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                      <p style="margin:0;color:#e6edf3;font-size:15px;font-weight:600;">${data.nombre} ${data.apellido}</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #21262d;">
                      <p style="margin:0 0 2px;color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Correo</p>
                      <p style="margin:0;font-size:15px;">
                        <a href="mailto:${data.correo}" style="color:#00e5ff;text-decoration:none;">${data.correo}</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #21262d;">
                      <p style="margin:0 0 2px;color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Instagram</p>
                      <p style="margin:0;font-size:15px;">
                        <a href="https://instagram.com/${data.usuario_instagram}" target="_blank" style="color:#00e5ff;text-decoration:none;">@${data.usuario_instagram}</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 0;">
                      <p style="margin:0 0 2px;color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Tipo de negocio</p>
                      <p style="margin:0;font-size:15px;">
                        <span style="display:inline-block;background:rgba(0,229,255,0.08);color:#00e5ff;font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;border:1px solid rgba(0,229,255,0.2);">
                          ${data.tipo_negocio}
                        </span>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#0d1117;padding:14px 32px;border-top:1px solid #21262d;">
                <p style="margin:0;color:#484f58;font-size:11px;">
                  ${new Date().toLocaleDateString('es-CL', { dateStyle: 'full' })} · ${new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}