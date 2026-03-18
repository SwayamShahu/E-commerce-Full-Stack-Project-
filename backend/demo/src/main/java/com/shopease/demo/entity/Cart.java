package com.shopease.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<CartItem> cartItems = new ArrayList<>();

  public Cart(User user) {
    this.user = user;
    this.cartItems = new ArrayList<>();
  }

  public void addProduct(Product product) {
    for (CartItem item : cartItems) {
      if (item.getProduct().getId().equals(product.getId())) {
        item.setQuantity(item.getQuantity() + 1);
        return;
      }
    }
    // Product not in cart - create new item
    CartItem newItem = new CartItem(this, product, 1);
    cartItems.add(newItem);
  }

  public void decreaseProductQuantity(Product product) {
    Iterator<CartItem> iterator = cartItems.iterator();
    while (iterator.hasNext()) {
      CartItem item = iterator.next();
      if (item.getProduct().getId().equals(product.getId())) {
        if (item.getQuantity() > 1) {
          item.setQuantity(item.getQuantity() - 1);
        } else {
          iterator.remove();  // Safe removal during iteration
        }
        return;
      }
    }
  }

  public void removeProduct(Product product) {
    cartItems.removeIf(item -> item.getProduct().getId().equals(product.getId()));
  }

  public void clear() {
    cartItems.clear();
  }
}