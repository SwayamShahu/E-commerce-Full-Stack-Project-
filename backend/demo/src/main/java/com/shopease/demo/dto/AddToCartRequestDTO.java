package com.shopease.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddToCartRequestDTO {

    private Long productId;
    private int quantity;
}
