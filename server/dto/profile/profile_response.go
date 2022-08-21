package profilesdto

import "waysbuck/models"

type Profile struct {
	ID      int                   `json:"id"`
	Phone   string                `json:"phone" gorm:"type: varchar(255)"`
	Address string                `json:"address" gorm:"type: text"`
	Image   string                `json:"image" gorm:"type: varchar(255)"`
	UserID  int                   `json:"user_id"`
	User    models.UserProfileRel `json:"user"`
}

type ProfileResponse struct {
	ID      int                   `json:"id"`
	Image   string                `json:"image" gorm:"type: varchar(255)"`
	Phone   string                `json:"phone" gorm:"type: varchar(255)"`
	Address string                `json:"address" gorm:"type: text"`
	UserID  int                   `json:"user_id"`
	User    models.UserProfileRel `json:"user"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
