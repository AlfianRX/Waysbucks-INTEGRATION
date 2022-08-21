package productsdto

type CreateProductRequest struct {
	Title string `json:"title" form:"title" gorm:"type: varchar(255)" validate:"required"`
	Price int    `json:"price" form:"price" gorm:"type: int" validate:"required"`
	Image string `json:"image" form:"image" validate:"required"`
}

type UpdateProductRequest struct {
	Title string `json:"title" form:"title"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image"`
}
