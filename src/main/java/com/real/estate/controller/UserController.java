package com.real.estate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.real.estate.customException.ErrorResponse;
import com.real.estate.customException.UserException;
import com.real.estate.entity.User;
import com.real.estate.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public ResponseEntity<?> registerUser(@RequestBody User registerUser) {
		try {
			return new ResponseEntity<>(userService.create(registerUser), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Failed to add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllUser() {
		try {
			return new ResponseEntity<>(userService.fetchAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Failed to load  data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getUser/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Integer id) {
	    try {
	        User existingUser = userService.fetchById(id);
	        if (existingUser != null) {
	            return new ResponseEntity<>(existingUser, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(new ErrorResponse("User not found", "No user found with ID " + id), HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(new ErrorResponse("Failed to load data", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateUserById(@PathVariable int id , @RequestBody User updatedUser) {
		try {
			User exitingUser = userService.fetchById(id);
			if (exitingUser != null) {
				return new ResponseEntity<>(userService.update(updatedUser, exitingUser) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new UserException("Not able to load data") , HttpStatus.BAD_REQUEST);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("User Updation Failed...", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable int id) {
		try {
			User foundUser = userService.fetchById(id);
			if(foundUser != null) {
				return new ResponseEntity<>(userService.delete(foundUser),HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(new UserException("Invalid UserId") , HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("User deletion Failed...", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/name/{userName}")
	public ResponseEntity<?> getUserByUserName(@PathVariable String userName) {
		try {
			return new ResponseEntity<>(userService.fetchByUserName(userName) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Invalid UserName", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
}
