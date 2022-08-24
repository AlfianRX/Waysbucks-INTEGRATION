package repositories

import (
	"waysbuck/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error) // Declare GetOneTransaction repository method ...
	CreateTransaction(transactions models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID string) error
}

type repositoryTransaction struct {
	db *gorm.DB
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Carts.Product").Preload("Carts.Toppings").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Find(&transactions, "id = ?", ID).Error

	return transactions, err
}

// GetOneTransaction method here ...
func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transactions models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transactions).Error

	return transactions, err
}

func (r *repository) UpdateTransaction(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("Product").First(&transaction, ID)

	//If is different & Status is "success" decrement product quantity
	if status != transaction.Status && status == "success" {
		var product models.Product
		r.db.First(&product, transaction.User.ID)
		r.db.Save(&product)
	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}
