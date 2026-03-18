package com.shopease.demo.repository;

import com.shopease.demo.entity.Cart;
import com.shopease.demo.entity.CartItem;
import com.shopease.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}

