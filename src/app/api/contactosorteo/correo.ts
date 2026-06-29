import { DatosFormSorteo } from "./route";

export function emailHtml(data: DatosFormSorteo): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="margin:0;padding:0;background:#070b16;font-family:'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 0;">
        <tr><td align="center">
          <table width="580" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid rgba(0,229,255,0.12);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#0f172a 0%,#0a1628 100%);padding:36px 40px 28px;border-bottom:1px solid rgba(0,229,255,0.1);">
                <p style="margin:0 0 10px;color:#00e5ff;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">BM Code Lab · Sorteo</p>
                <h1 style="margin:0 0 8px;color:#ffffff;font-size:26px;font-weight:700;line-height:1.2;">¡Ya estás participando! 🎉</h1>
                <p style="margin:0;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">Recibimos tu registro correctamente. Estás un paso más cerca de ganar.</p>
              </td>
            </tr>

            <!-- Saludo personalizado -->
            <tr>
              <td style="padding:28px 40px 0;">
                <p style="margin:0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;">
                  Hola <strong style="color:#ffffff;">${data.nombre} ${data.apellido}</strong>,<br/>
                  tu participación en el sorteo ha sido registrada con éxito. Recuerda completar los 3 pasos para que tu registro sea válido y aumentar tus probabilidades de ganar.
                </p>
              </td>
            </tr>

            <!-- Pasos a recordar -->
            <tr>
              <td style="padding:24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.1);border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:16px 20px;border-bottom:1px solid rgba(0,229,255,0.07);">
                      <p style="margin:0;color:#00e5ff;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Recuerda completar</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                      <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;">
                        <span style="color:#00e5ff;font-weight:700;margin-right:10px;">01</span>
                        Seguir nuestra cuenta de Instagram
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                      <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;">
                        <span style="color:#00e5ff;font-weight:700;margin-right:10px;">02</span>
                        Compartir la publicación en tus historias
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px;">
                      <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;">
                        <span style="color:#00e5ff;font-weight:700;margin-right:10px;">03</span>
                        Etiquetar amigos emprendedores en los comentarios
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Datos del registro -->
            <tr>
              <td style="padding:0 40px 28px;">
                <p style="margin:0 0 12px;color:rgba(255,255,255,0.35);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Tu registro</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                      <p style="margin:0 0 2px;color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:1px;">Nombre completo</p>
                      <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;">${data.nombre} ${data.apellido}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                      <p style="margin:0 0 2px;color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:1px;">Correo</p>
                      <p style="margin:0;font-size:14px;"><a href="mailto:${data.correo}" style="color:#00e5ff;text-decoration:none;">${data.correo}</a></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                      <p style="margin:0 0 2px;color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:1px;">Instagram</p>
                      <p style="margin:0;color:#ffffff;font-size:14px;">@${data.usuario_instagram}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;">
                      <p style="margin:0 0 2px;color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:1px;">Tipo de negocio</p>
                      <p style="margin:0;font-size:14px;">
                        <span style="display:inline-block;background:rgba(0,229,255,0.08);color:#00e5ff;font-size:12px;font-weight:600;letter-spacing:1px;padding:4px 12px;border-radius:20px;border:1px solid rgba(0,229,255,0.2);">
                          ${data.tipo_negocio}
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA web corporativa -->
            <tr>
              <td style="padding:0 40px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,rgba(0,229,255,0.07),rgba(59,130,246,0.07));border:1px solid rgba(0,229,255,0.15);border-radius:12px;">
                  <tr>
                    <td style="padding:20px 24px;">
                      <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:600;">¿Querés saber más sobre nuestros servicios?</p>
                      <p style="margin:0 0 16px;color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;">En BM Code Lab desarrollamos software a medida, sitios web y soluciones digitales para emprendedores y empresas.</p>
                      <a href="https://www.bmcodelab.cl/" style="display:inline-block;background:#00e5ff;color:#070b16;font-size:13px;font-weight:700;letter-spacing:0.5px;padding:10px 22px;border-radius:8px;text-decoration:none;">Visitar bmcodelab.cl →</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:rgba(0,0,0,0.25);padding:18px 40px;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:0;color:rgba(255,255,255,0.25);font-size:12px;line-height:1.6;">
                  Enviado el ${new Date().toLocaleDateString('es-CL', { dateStyle: 'full' })} &middot;
                  <a href="https://www.bmcodelab.cl/" style="color:rgba(0,229,255,0.5);text-decoration:none;">bmcodelab.cl</a>
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
