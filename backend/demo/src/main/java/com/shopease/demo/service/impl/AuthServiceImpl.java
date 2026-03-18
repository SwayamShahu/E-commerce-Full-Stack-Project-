package com.shopease.demo.service.impl;

import com.shopease.demo.dto.LoginRequest;
import com.shopease.demo.dto.LoginResponse;
import com.shopease.demo.dto.RegisterRequest;
import com.shopease.demo.dto.UserResponse;
import com.shopease.demo.entity.User;
import com.shopease.demo.repository.UserRepository;
import com.shopease.demo.security.JwtUtil;
import com.shopease.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public static UserResponse touserResponse(User user){
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }

    @Override
    public UserResponse register(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())) throw new RuntimeException("Email Already Exist");
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        return touserResponse(userRepository.save(user));
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("Invalid Email or Password"));
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) throw new RuntimeException("Invalid Password");
            return new LoginResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name(), jwtUtil.generateToken(user));
    }
}
