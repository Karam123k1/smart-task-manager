package com.anilaltunkan.security.service;
import com.anilaltunkan.security.dto.AuthRequest;
import com.anilaltunkan.security.dto.AuthResponse;
import com.anilaltunkan.security.dto.RegisterRequest;
import com.anilaltunkan.security.model.User;
import com.anilaltunkan.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.USER);

        userRepository.save(user);
        String jwt = jwtService.generateToken(user.getUsername());
        return new AuthResponse(jwt);
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(NoSuchElementException::new);
        String jwt = jwtService.generateToken(user.getUsername());
        return new AuthResponse(jwt);
    }
}
