package com.shopease.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    private String name;

    private double price;

    private String description;

    private String imageUrl;

    private Long categoryId;
}
