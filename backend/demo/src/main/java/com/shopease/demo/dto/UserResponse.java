package com.shopease.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name, role, email;
}

