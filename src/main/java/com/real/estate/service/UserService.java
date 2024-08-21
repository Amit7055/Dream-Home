package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.User;
import com.real.estate.jparepo.UserRepo;

@Service
public class UserService implements CurdService<User, Integer> {

	@Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User create(User user) {
        // Encode the user's password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Save the user with the encoded password
        return userRepo.save(user);
    }

	@Override
	public List<User> fetchAll() {
		return userRepo.findAll();
	}

	@Override
	public User fetchById(Integer id) {
		return userRepo.findById(id).orElseThrow(()-> new UserException("Invalid id"));
	}

	@Override
	public User update(User updatedUser, User existingUser) {
		String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
		if (updatedUser.getFirstName() != null) existingUser.setFirstName(updatedUser.getFirstName());
        if (updatedUser.getLastName() != null) existingUser.setLastName(updatedUser.getLastName());
        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPhoneNo() != 0) existingUser.setPhoneNo(updatedUser.getPhoneNo());
        if (updatedUser.getAddress() != null) existingUser.setAddress(updatedUser.getAddress());
        if (updatedUser.getCity() != null) existingUser.setCity(updatedUser.getCity());
        if (updatedUser.getState() != null) existingUser.setState(updatedUser.getState());
        if (updatedUser.getPincode() != null) existingUser.setPincode(updatedUser.getPincode());
        if (updatedUser.getUserName() != null) existingUser.setUserName(updatedUser.getUserName());
        if (updatedUser.getPassword() != null) existingUser.setPassword(encodedPassword);
       
		return userRepo.save(existingUser);
	}

	@Override
	public String delete(User userDelete) {
		userRepo.delete(userDelete);
		return "Delete : " + userDelete.getUserId()+" "+ userDelete.getFirstName();
	}
	
	public User fetchByUserName(String userName) {
		return userRepo.findByuserName(userName);
	}

}
