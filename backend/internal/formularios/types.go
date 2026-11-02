package formularios

// Contacto replica el formulario de contacto del home (Contacto.tsx).
type Contacto struct {
	Nombre       string `json:"nombre"`
	Email        string `json:"email"`
	Telefono     string `json:"telefono"`
	TipoProyecto string `json:"tipoProyecto"`
	Mensaje      string `json:"mensaje"`
}

// Participante replica el formulario del sorteo (Formulario.tsx).
type Participante struct {
	Nombre           string  `json:"nombre"`
	Apellido         string  `json:"apellido"`
	Correo           string  `json:"correo"`
	UsuarioInstagram string  `json:"usuario_instagram"`
	TipoNegocio      string  `json:"tipo_negocio"`
	NombreNegocio    string  `json:"nombre_negocio"`
	Comuna           string  `json:"comuna"`
	TieneSitioWeb    bool    `json:"tiene_sitio_web"`
	URLSitioWeb      *string `json:"url_sitio_web"`
}
