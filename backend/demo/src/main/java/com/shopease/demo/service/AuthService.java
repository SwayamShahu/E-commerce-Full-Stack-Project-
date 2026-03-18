package com.shopease.demo.service;


import com.shopease.demo.dto.LoginRequest;
import com.shopease.demo.dto.LoginResponse;
import com.shopease.demo.dto.RegisterRequest;
import com.shopease.demo.dto.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);
}
