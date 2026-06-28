package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.model.User;
import com.cognizant.spring_learn.repository.UserRepo;
import com.cognizant.spring_learn.service.UserService;
import com.cognizant.spring_learn.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping
public class AuthController {
    private UserRepo userRepo;
    private UserService userService;
    private JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = passwordEncoder.encode(body.get("password"));

        if(userRepo.findByEmail(email).isPresent()){
            return new ResponseEntity<String>("User already exixts", HttpStatus.ALREADY_REPORTED);
        }
        userService.saveUser(User.builder().email(email).password(password).build());
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = passwordEncoder.encode(body.get("password"));

        var optionalUser = userRepo.findByEmail(email);
        if(optionalUser.isEmpty()){
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
        if(passwordEncoder.matches(password,optionalUser.get().getPassword())){
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
