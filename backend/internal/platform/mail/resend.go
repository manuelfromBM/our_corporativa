package mail

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"
)

const resendURL = "https://api.resend.com/emails"

// Client envía correos con la API de Resend.
type Client struct {
	apiKey string
	from   string
	http   *http.Client
}

func New(apiKey, from string) *Client {
	return &Client{apiKey: apiKey, from: from, http: &http.Client{Timeout: 10 * time.Second}}
}

// Message es un correo HTML. ReplyTo es opcional.
type Message struct {
	To      []string
	ReplyTo string
	Subject string
	HTML    string
}

func (c *Client) Send(ctx context.Context, to, subject, html string) error {
	return c.Deliver(ctx, Message{To: []string{to}, Subject: subject, HTML: html})
}

// Deliver envía el correo. Sin API key (solo permitido fuera de producción, ver config)
// lo escribe en el log para poder probar invitaciones y recuperación en local.
func (c *Client) Deliver(ctx context.Context, m Message) error {
	if c.apiKey == "" {
		log.Printf("correo omitido (sin RESEND_API_KEY) para %s: %s\n%s", strings.Join(m.To, ", "), m.Subject, m.HTML)
		return nil
	}

	payload := map[string]any{"from": c.from, "to": m.To, "subject": m.Subject, "html": m.HTML}
	if m.ReplyTo != "" {
		payload["reply_to"] = m.ReplyTo
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, resendURL, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")

	res, err := c.http.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		detail, _ := io.ReadAll(io.LimitReader(res.Body, 1024))
		return fmt.Errorf("resend respondió %d: %s", res.StatusCode, detail)
	}
	return nil
}
