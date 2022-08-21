package handlers

import (
	"encoding/json"
	"net/http"
	dto "waysbuck/dto/result"
	"waysbuck/repositories"
)

type handlerCart struct {
	CartRepository repositories.CartRepository
}

func HandlerCart(CartRepository repositories.CartRepository) *handlerCart {
	return &handlerCart{CartRepository}
}

func (h *handlerCart) FindCarts(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	carts, err := h.CartRepository.FindCarts()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: http.StatusOK, Data: carts}

	json.NewEncoder(w).Encode(response)
}
