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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.real.estate.customException.ErrorResponse;
import com.real.estate.customException.UserException;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.service.PropertiesService;

@RestController
@RequestMapping("/properties")
public class PropertiesController {
	
	@Autowired
	private PropertiesService propertiesService;
	
//	@PostMapping(consumes = {"multipart/form-data"})
//	public ResponseEntity<?> registerProperties(@RequestPart("newProperty") Properties properties,
//	                                             @RequestPart(value = "image") MultipartFile image) {
//		try {
//	    	
//	        if (image != null && !image.isEmpty()) {
//	            properties.setImage(image.getBytes());
//	        } else {
//	            // Handle case where image is optional or not provided
//	            return new ResponseEntity<>(new ErrorResponse("Image file is required", "Please upload an image file"), HttpStatus.BAD_REQUEST);
//	        }
//	        
//	        // Validate properties object if necessary
//	        Properties savedProperties = propertiesService.create(properties);
//
//	        return new ResponseEntity<>(savedProperties, HttpStatus.OK);
//	    } catch (Exception e) {
//	        // Log the exception for debugging
//	        e.printStackTrace();
//	        return new ResponseEntity<>(new ErrorResponse("Unable to add data", e.getMessage()), HttpStatus.BAD_REQUEST);
//	    }
//	}
	
	@PostMapping("/add")
	public ResponseEntity<?> registerUser(@RequestBody Properties registerProperties) {
		try {
			return new ResponseEntity<>(propertiesService.create(registerProperties), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Failed to add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}

	
//	@GetMapping("/all")
//	public ResponseEntity<?> getAllProperties() {
//		try {
//			return new ResponseEntity<>(propertiesService.fetchAll()  , HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(new ErrorResponse("Unable to load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
//		}
//	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllProperties() {
		try {
			return new ResponseEntity<>(propertiesService.getAll()  , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getproperty/{id}")
	public ResponseEntity<?> getPropertiesbyId(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(propertiesService.fetchById(id) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateProperty(@PathVariable Integer id , @RequestBody Properties updatedProperty) {
		try {
			Properties existingProperty = propertiesService.fetchById(id);
			if (existingProperty != null) {
				return new ResponseEntity<>(propertiesService.update(updatedProperty, existingProperty) , HttpStatus.OK); 
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
			Properties deleteProperty = propertiesService.fetchById(id);
			if (deleteProperty != null) {
				return new ResponseEntity<>(propertiesService.delete(deleteProperty) , HttpStatus.OK); 
			} else {
				return new ResponseEntity<>(new UserException("Invalid Property Id") , HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable to delete data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}

}