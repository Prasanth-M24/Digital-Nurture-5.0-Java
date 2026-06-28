package com.cognizant.spring_learn.config;

import com.cognizant.spring_learn.CustomeFilterChain;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity  http, CustomeFilterChain filterChain) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth)-> auth
                        .requestMatchers("/register").permitAll()
                        .requestMatchers("/authenticate").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(filterChain, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
