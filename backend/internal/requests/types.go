package requests

import "encoding/json"

// Requerimiento replica el payload que arma construirPayload en el frontend (requerimientosApi.ts).
type Requerimiento struct {
	Servicio  ServicioRequerimiento `json:"servicio"`
	Contacto  ContactoRequerimiento `json:"contacto"`
	Secciones []SeccionRespuestas   `json:"secciones"`
	EnviadoEn string                `json:"enviado_en"`
	// Sorteo marca las solicitudes que llegan desde el registro al sorteo (detalle del sitio que quiere el participante).
	Sorteo bool `json:"sorteo"`
}

type ServicioRequerimiento struct {
	Slug   string `json:"slug"`
	Titulo string `json:"titulo"`
}

type ContactoRequerimiento struct {
	Nombre         string `json:"nombre"`
	Correo         string `json:"correo"`
	Telefono       string `json:"telefono"`
	Empresa        string `json:"empresa"`
	MedioPreferido string `json:"medio_preferido"`
}

type SeccionRespuestas struct {
	ID         string           `json:"id"`
	Titulo     string           `json:"titulo"`
	Respuestas []RespuestaCampo `json:"respuestas"`
}

// Respuesta puede ser texto, lista de opciones o booleano; se guarda tal cual como JSON.
type RespuestaCampo struct {
	ID        string          `json:"id"`
	Pregunta  string          `json:"pregunta"`
	Respuesta json.RawMessage `json:"respuesta"`
}

// RequerimientoGuardado es un requerimiento tal como quedó en la base, para el panel de administración.
type RequerimientoGuardado struct {
	ID       int64  `json:"id"`
	Codigo   string `json:"codigo"`
	CreadoEn string `json:"creado_en"`
	Requerimiento
}
