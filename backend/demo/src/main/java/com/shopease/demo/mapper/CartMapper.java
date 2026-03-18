package com.shopease.demo.mapper;

import com.shopease.demo.dto.CartItemResponseDTO;
import com.shopease.demo.dto.CartResponseDTO;
import com.shopease.demo.entity.Cart;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartMapper {

    public CartResponseDTO toDto(Cart cart) {

        CartResponseDTO dto = new CartResponseDTO();

        List<CartItemResponseDTO> itemDtos = cart.getCartItems().stream()
                .map(item -> {
                    CartItemResponseDTO i = new CartItemResponseDTO();
                    i.setProductId(item.getProduct().getId());
                    i.setProductName(item.getProduct().getName());
                    i.setQuantity(item.getQuantity());
                    i.setPrice(item.getProduct().getPrice());
                    return i;
                })
                .toList();

        dto.setItems(itemDtos);

        double total = cart.getCartItems().stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        dto.setTotalAmount(total);

        return dto;
    }
}

