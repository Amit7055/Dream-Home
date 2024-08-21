package com.real.estate.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.real.estate.entity.LandlordTenant;
import com.real.estate.service.LandlordTenantService;

@RestController
@RequestMapping("/rental")
@CrossOrigin("*")
public class LandlordTenantController {

	@Autowired
	private LandlordTenantService landlordTenantService;
	
	@PostMapping("/add")
	public ResponseEntity<?> registerLandlordTenant(@RequestBody LandlordTenant newLandlordTenant) {
		try {
			 return new ResponseEntity<>(landlordTenantService.create(newLandlordTenant), HttpStatus.OK);
		} catch (Exception e) {
			 return new ResponseEntity<>(new ErrorResponse("Unable to process Request", e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	
	@GetMapping("/all")
	public ResponseEntity<?> getAllLandlordTenant() {
		try {
			return new ResponseEntity<>(landlordTenantService.fetchAll() , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to load data", e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getrental/{id}")
	public ResponseEntity<?> getByLandlordTenant(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(landlordTenantService.fetchById(id) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to load data", e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateLandlordTenant(@PathVariable Integer id ,@RequestBody LandlordTenant updateLandlordTenant) {
		try {
			LandlordTenant existLandlordTenant = landlordTenantService.fetchById(id);
			if (existLandlordTenant != null) {
				return new ResponseEntity<>(landlordTenantService.update(updateLandlordTenant, existLandlordTenant) , HttpStatus.OK); 
			} else {
				return new ResponseEntity<>(new UserException("Invalid Property Id") , HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to update data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteProperty(@PathVariable Integer id) {
		try {
			LandlordTenant deleteLandlordTenant = landlordTenantService.fetchById(id);
			if (deleteLandlordTenant != null) {
				return new ResponseEntity<>(landlordTenantService.delete(deleteLandlordTenant) , HttpStatus.OK); 
			} else {
				return new ResponseEntity<>(new UserException("Invalid Property Id") , HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to delete data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
}
