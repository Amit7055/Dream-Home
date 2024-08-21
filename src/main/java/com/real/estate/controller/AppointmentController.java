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
import com.real.estate.entity.Appointment;
import com.real.estate.service.AppointmentService;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/add")
	public ResponseEntity<?> newAppointment(@RequestBody Appointment appointment) {
		try {
			return new ResponseEntity<>(appointmentService.create(appointment) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getALlAppointment() {
		try {
			return new ResponseEntity<>(appointmentService.fetchAll() , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getByIdAppointment(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(appointmentService.fetchById(id) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> getByIdAppointment(@PathVariable Integer id ,@RequestBody Appointment updateAppointment) {
		try {
			Appointment existAppointment = appointmentService.fetchById(id);
			if (existAppointment != null) {
				return new ResponseEntity<>(appointmentService.update(updateAppointment, existAppointment) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteAppointment(@PathVariable Integer id) {
		try {
			Appointment deleteAppointment = appointmentService.fetchById(id);
			if (deleteAppointment != null) {
				return new ResponseEntity<>(appointmentService.delete(deleteAppointment) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
}
