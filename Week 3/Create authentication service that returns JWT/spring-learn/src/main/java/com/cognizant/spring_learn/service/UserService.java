package com.cognizant.spring_learn.service;

import com.cognizant.spring_learn.model.User;
import com.cognizant.spring_learn.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepo userRepo;

    public User saveUser(User user){
        return userRepo.save(user);
    }
}
