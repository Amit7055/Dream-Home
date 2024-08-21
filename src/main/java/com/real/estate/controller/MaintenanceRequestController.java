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
import com.real.estate.entity.MaintenanceRequest;
import com.real.estate.service.MaintenanceRequestService;

@RestController
@RequestMapping("/maintain")
public class MaintenanceRequestController {
	
	@Autowired
	private MaintenanceRequestService requestService;
	
	@PostMapping("/add")
	public ResponseEntity<?> newMaintenanceRequest(@RequestBody MaintenanceRequest request) {
		try {
			return new ResponseEntity<>(requestService.create(request) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getALlMaintenanceRequestl() {
		try {
			return new ResponseEntity<>(requestService.fetchAll() , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getByIdMaintenanceRequest(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(requestService.fetchById(id) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> getByIdMaintenanceRequest(@PathVariable Integer id ,@RequestBody MaintenanceRequest updateMaintenanceRequest) {
		try {
			MaintenanceRequest existMaintenanceRequest = requestService.fetchById(id);
			if (existMaintenanceRequest != null) {
				return new ResponseEntity<>(requestService.update(updateMaintenanceRequest ,existMaintenanceRequest) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteBuySell(@PathVariable Integer id) {
		try {
			MaintenanceRequest deleteMaintenanceRequest = requestService.fetchById(id);
			if (deleteMaintenanceRequest != null) {
				return new ResponseEntity<>(requestService.delete(deleteMaintenanceRequest) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
}
