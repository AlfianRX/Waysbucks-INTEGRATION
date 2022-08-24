package models

import "time"

type Transaction struct {
	ID        int            `json:"id" gorm:"primary_key:auto_increment"`
	Price     int            `json:"price"`
	UserID    int            `json:"user_id"`
	User      UserProfileRel `json:"user"`
	Carts     []Cart         `json:"cart"`
	Status    string         `json:"status"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"updated_at"`
}

type TransactionCartRel struct {
	ID     int `json:"id"`
	UserId int `json:"user_id"`
	Price  int `json:"price"`
}

type TransactionUserRel struct {
	ID     int `json:"id"`
	UserId int `json:"user_id"`
}

func (TransactionCartRel) TableName() string {
	return "transactions"
}
func (TransactionUserRel) TableName() string {
	return "transactions"
}
