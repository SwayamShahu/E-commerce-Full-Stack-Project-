package com.shopease.demo.service;

import com.shopease.demo.dto.OrderResponseDTO;
import com.shopease.demo.entity.User;

import java.util.List;

public interface OrderService {
    OrderResponseDTO placeOrder(User user);

    OrderResponseDTO checkout(User user);

    List<OrderResponseDTO> getOrders(User user);

    List<OrderResponseDTO> getAllOrders();

    OrderResponseDTO updateOrderStatus(Long orderId, String status);
}
