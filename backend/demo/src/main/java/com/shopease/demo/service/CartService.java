package com.shopease.demo.service;

import com.shopease.demo.entity.Cart;
import com.shopease.demo.entity.User;

public interface CartService {
    Cart getCartForUser(User user);
    Cart addProductToCart(User user, Long productId);
    Cart removeProductFromCart(User user, Long productId);
    Cart decreaseProductQuantity(User user, Long productId);
    Cart clearCart(User user);
}
