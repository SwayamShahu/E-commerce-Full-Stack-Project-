package com.shopease.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemResponseDTO {
    private Long productId;
    private String productName;
    private int quantity;
    private double price;
}