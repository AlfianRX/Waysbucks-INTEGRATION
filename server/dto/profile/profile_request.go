package profilesdto

type ProfileRequest struct {
	ID      int    `json:"id"`
	Phone   string `json:"phone" gorm:"type: varchar(255)"`
	Address string `json:"address" gorm:"type: text"`
	Image   string `json:"image" gorm:"type: varchar(255)"`
	UserID  int    `json:"user_id"`
}
