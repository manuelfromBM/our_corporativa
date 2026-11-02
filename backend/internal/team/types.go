package team

// Member replica el tipo TeamMember del frontend (ProfileTeamData.ts).
type Member struct {
	Slug     string   `json:"slug"`
	Initials string   `json:"initials"`
	Img      string   `json:"img"`
	Alt      string   `json:"alt"`
	Badge    string   `json:"badge"`
	Name     string   `json:"name"`
	Role     string   `json:"role"`
	Tech     TechInfo `json:"tech"`
	Biz      BizInfo  `json:"biz"`
}

type TechInfo struct {
	Bio        string            `json:"bio"`
	Experience []Experience      `json:"experience,omitempty"`
	Education  []Education       `json:"education,omitempty"`
	Stats      []Stat            `json:"stats"`
	Skills     []string          `json:"skills"`
	Libraries  []LibraryCategory `json:"libraries,omitempty"`
	Tools      []string          `json:"tools"`
}

type Experience struct {
	Company     string `json:"company"`
	Role        string `json:"role"`
	Period      string `json:"period"`
	Description string `json:"description"`
}

type Education struct {
	Institution string `json:"institution"`
	Degree      string `json:"degree"`
	Period      string `json:"period"`
}

type Stat struct {
	Value string `json:"value"`
	Label string `json:"label"`
}

type LibraryCategory struct {
	Category string   `json:"category"`
	Items    []string `json:"items"`
}

type BizInfo struct {
	Bio   string    `json:"bio"`
	Cards []BizCard `json:"cards"`
}

type BizCard struct {
	Icon  string `json:"icon"`
	Title string `json:"title"`
	Desc  string `json:"desc"`
}
