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
import com.real.estate.entity.BuySell;
import com.real.estate.service.BuySellService;

@RestController
@RequestMapping("/buysell")
public class BuySellController {
	
	@Autowired
	private BuySellService buySellService;
	
	@PostMapping("/add")
	public ResponseEntity<?> newBuySell(@RequestBody BuySell buySell) {
		try {
			return new ResponseEntity<>(buySellService.create(buySell) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable add data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getALlBuySell() {
		try {
			return new ResponseEntity<>(buySellService.fetchAll() , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getByIdBuySell(@PathVariable Integer id) {
		try {
			return new ResponseEntity<>(buySellService.fetchById(id) , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> getByIdBuySell(@PathVariable Integer id ,@RequestBody BuySell updateBuySell) {
		try {
			BuySell existBuySell = buySellService.fetchById(id);
			if (existBuySell != null) {
				return new ResponseEntity<>(buySellService.update(updateBuySell, existBuySell) , HttpStatus.OK);
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
			BuySell deleteBuySell = buySellService.fetchById(id);
			if (deleteBuySell != null) {
				return new ResponseEntity<>(buySellService.delete(deleteBuySell) , HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ErrorResponse("No data exist", "No such id exist"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponse("Unable load data", e.getMessage()) , HttpStatus.BAD_REQUEST);
		}
	}
	
}
