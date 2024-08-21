package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.BuySell;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.jparepo.BuySellRepo;
import com.real.estate.jparepo.PropertiesRepo;
import com.real.estate.jparepo.UserRepo;

@Service
public class BuySellService implements CurdService<BuySell, Integer> {

	@Autowired
	private BuySellRepo buySellRepo;
	
	@Autowired
	private PropertiesRepo propertiesRepo;
	
	@Autowired
	private UserRepo userRepository;
	
	@Override
	public BuySell create(BuySell newBuySell) {
		return buySellRepo.save(newBuySell);
	}

	@Override
	public List<BuySell> fetchAll() {
		return buySellRepo.findAll();
	}

	@Override
	public BuySell fetchById(Integer k) {
		return buySellRepo.findById(k).orElseThrow(() -> new UserException("Invalid Id"));
	}

	@Override
	public BuySell update(BuySell updateBuySell, BuySell existBuySell) {
		existBuySell.setBookingAmount(updateBuySell.getBookingAmount());
        existBuySell.setTotalAmount(updateBuySell.getTotalAmount());
        existBuySell.setStatus(updateBuySell.getStatus());
        existBuySell.setBookingDate(updateBuySell.getBookingDate());
        
     // Update foreign key relationships
	    if (updateBuySell.getOwnerId() != null) {
	    	User user = userRepository.findById(updateBuySell.getOwnerId().getUserId())
	    			.orElseThrow(() -> new UserException("User not found for this id :: " + updateBuySell.getOwnerId().getUserId()));
	    	existBuySell.setOwnerId(user);
	    }
	    if (updateBuySell.getBuyerId() != null) {
	    	User user = userRepository.findById(updateBuySell.getBuyerId().getUserId())
	    			.orElseThrow(() -> new UserException("User not found for this id :: " + updateBuySell.getBuyerId().getUserId()));
	    	existBuySell.setBuyerId(user);
	    }
	    if (updateBuySell.getProperties() != null) {
	    	Properties properties = propertiesRepo.findById(updateBuySell.getProperties().getPropertyId())
	    			.orElseThrow(() -> new UserException("Property not found for this id :: " + updateBuySell.getProperties().getPropertyId()));
	    	existBuySell.setProperties(properties);
	    }
        
		return buySellRepo.save(existBuySell);
	}

	@Override
	public String delete(BuySell deleteBuySell) {
		buySellRepo.delete(deleteBuySell);
		return "Deleted rental ID : "+deleteBuySell.getBuySellId();
	}

}
