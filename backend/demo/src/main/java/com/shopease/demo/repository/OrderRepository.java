package com.shopease.demo.repository;

import com.shopease.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import com.shopease.demo.entity.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUser(User user);
}
