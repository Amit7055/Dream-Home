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
import com.real.estate.entity.Feedback;
import com.real.estate.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/add")
	public ResponseEntity<?> newFeedback(@RequestBody Feedback feedback) {
		try {
			return new ResponseEntity<>(feedbackService.create(feedback) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getALlFeedback() {
		try {
			return new ResponseEntity<>(feedbackService.fetchAll() , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getByIdFeedback(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(feedbackService.fetchById(id) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> getByIdFeedback(@PathVariable Integer id ,@RequestBody Feedback updateFeedback) {
		try {
			Feedback existFeedback = feedbackService.fetchById(id);
			if (existFeedback != null) {
				return new ResponseEntity<>(feedbackService.update(updateFeedback,existFeedback) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteFeedback(@PathVariable Integer id) {
		try {
			Feedback deleteFeedback = feedbackService.fetchById(id);
			if (deleteFeedback != null) {
				return new ResponseEntity<>(feedbackService.delete(deleteFeedback) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
}
