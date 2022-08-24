package transactiondto

type TransactionRequest struct {
	CartId int `gorm:"type: int" json:"cartId" validate:"required"`
	UserId int `gorm:"type: int" json:"userId" validate:"required"`
	Price  int `gorm:"type: int" json:"price" validate:"required"`
}
