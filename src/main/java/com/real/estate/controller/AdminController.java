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
import com.real.estate.entity.Admin;
import com.real.estate.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/add")
	public ResponseEntity<?> registerAdmin(@RequestBody Admin registerAdmin) {
		try {
			return new ResponseEntity<>(adminService.create(registerAdmin), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Failed to add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllAdmin() {
		try {
			return new ResponseEntity<>(adminService.fetchAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Failed to load  data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getUser/{id}")
	public ResponseEntity<?> getAdminById(@PathVariable Integer id) {
	    try {
	    	Admin existingAdmin = adminService.fetchById(id);
	        if (existingAdmin != null) {
	            return new ResponseEntity<>(existingAdmin, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(new ErrorResponse("User not found", "No user found with ID " + id), HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(new ErrorResponse("Failed to load data", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateAdminById(@PathVariable int id , @RequestBody Admin updatedAdmin) {
		try {
			Admin exitingAdmin = adminService.fetchById(id);
			if (exitingAdmin != null) {
				return new ResponseEntity<>(adminService.update(updatedAdmin, exitingAdmin) , HttpStatus.OK);
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
			Admin foundAdmin = adminService.fetchById(id);
			if(foundAdmin != null) {
				return new ResponseEntity<>(adminService.delete(foundAdmin),HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(new UserException("Invalid UserId") , HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("User deletion Failed...", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}

}
