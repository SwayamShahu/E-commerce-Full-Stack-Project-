package com.shopease.demo.controller;

import com.shopease.demo.dto.OrderResponseDTO;
import com.shopease.demo.entity.User;
import com.shopease.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponseDTO placeOrder(@AuthenticationPrincipal User user) {
        return orderService.placeOrder(user);
    }

    @PostMapping("/checkout")
    public OrderResponseDTO checkout(@AuthenticationPrincipal User user) {
        return orderService.checkout(user);
    }

    @GetMapping
    public List<OrderResponseDTO> getOrders(@AuthenticationPrincipal User user) {
        return orderService.getOrders(user);
    }

    @GetMapping("/admin/all")
    public List<OrderResponseDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/admin/{orderId}/status")
    public OrderResponseDTO updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return orderService.updateOrderStatus(orderId, status);
    }
}