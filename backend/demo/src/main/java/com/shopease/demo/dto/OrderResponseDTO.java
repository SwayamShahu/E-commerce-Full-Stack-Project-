package com.shopease.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponseDTO {
    private Long orderId;
    private double totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDTO> items;
}
