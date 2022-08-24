package transactiondto

type TransactionResponse struct {
	ID     int    `json:"id" gorm:"primary_key:auto_increment"`
	Price  int    `json:"price"`
	UserID int    `json:"user_id"`
	Status string `json:"status"`
}
