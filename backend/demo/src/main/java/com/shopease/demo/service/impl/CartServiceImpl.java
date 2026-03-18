package com.shopease.demo.service.impl;

import com.shopease.demo.entity.Cart;
import com.shopease.demo.entity.Product;
import com.shopease.demo.entity.User;
import com.shopease.demo.repository.CartRepository;
import com.shopease.demo.repository.ProductRepository;
import com.shopease.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Cart getCartForUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart(user);
                    return cartRepository.save(newCart);
                });
    }

    @Override
    @Transactional
    public Cart addProductToCart(User user, Long productId) {
        Cart cart = getCartForUser(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.addProduct(product);
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart decreaseProductQuantity(User user, Long productId) {
        Cart cart = getCartForUser(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.decreaseProductQuantity(product);
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart removeProductFromCart(User user, Long productId) {
        Cart cart = getCartForUser(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.removeProduct(product);
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart clearCart(User user) {
        Cart cart = getCartForUser(user);
        cart.clear();
        return cartRepository.save(cart);
    }
}