package com.shopease.demo.service;

import com.shopease.demo.dto.ProductRequest;
import com.shopease.demo.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long productId, ProductRequest request);

    void deleteProduct(Long productId);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long productId);

    List<ProductResponse> getProductsByCategory(Long categoryId);
}
