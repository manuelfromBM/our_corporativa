package clients

import (
	"context"
	"net/mail"
	"strings"

	"backend/internal/platform/httpx"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context) ([]Client, error) {
	return s.repo.list(ctx)
}

func (s *Service) Get(ctx context.Context, id int64) (*Client, error) {
	return s.repo.get(ctx, id)
}

func (s *Service) Create(ctx context.Context, in Input) (*Client, error) {
	if err := normalize(&in); err != nil {
		return nil, err
	}
	id, err := s.repo.create(ctx, in)
	if err != nil {
		return nil, err
	}
	return s.repo.get(ctx, id)
}

func (s *Service) Update(ctx context.Context, id int64, in Input) (*Client, error) {
	if err := normalize(&in); err != nil {
		return nil, err
	}
	if err := s.repo.update(ctx, id, in); err != nil {
		return nil, err
	}
	return s.repo.get(ctx, id)
}

func normalize(in *Input) error {
	in.Name = strings.TrimSpace(in.Name)
	in.ContactName = strings.TrimSpace(in.ContactName)
	in.Email = strings.ToLower(strings.TrimSpace(in.Email))
	in.Phone = strings.TrimSpace(in.Phone)

	if in.Name == "" {
		return httpx.Invalid("falta el nombre")
	}
	if in.Email != "" {
		if _, err := mail.ParseAddress(in.Email); err != nil {
			return httpx.Invalid("el correo no es válido")
		}
	}
	return nil
}
