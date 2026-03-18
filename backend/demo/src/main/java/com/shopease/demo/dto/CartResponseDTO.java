package com.shopease.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartResponseDTO {
    private List<CartItemResponseDTO> items;
    private double totalAmount;
}
