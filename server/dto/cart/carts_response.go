package cartsdto

type CartResponse struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	ProductID int    `json:"product_id"`
	ToppingID []int  `json:"topping_id"`
	QTY       int    `json:"qty"`
	SubTotal  int    `json:"subtotal"`
	Status    string `jsom:"status"`
}
