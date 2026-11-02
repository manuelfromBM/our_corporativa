package team

import "context"

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context) ([]Member, error) {
	return s.repo.GetAll(ctx)
}

func (s *Service) Slugs(ctx context.Context) ([]string, error) {
	return s.repo.GetSlugs(ctx)
}

func (s *Service) Get(ctx context.Context, slug string) (*Member, error) {
	return s.repo.GetBySlug(ctx, slug)
}
