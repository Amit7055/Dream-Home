package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.LandlordTenant;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.jparepo.LandlordTenantRepo;
import com.real.estate.jparepo.PropertiesRepo;
import com.real.estate.jparepo.UserRepo;

@Service
public class LandlordTenantService implements CurdService<LandlordTenant, Integer> {

	@Autowired
	private LandlordTenantRepo landlordTenantRepo;
	
	@Autowired
	private PropertiesRepo propertiesRepo;
	
	@Autowired
	private UserRepo userRepository;
	
	@Override
	public LandlordTenant create(LandlordTenant newLandlordTenant) {
		return landlordTenantRepo.save(newLandlordTenant);
	}

	@Override
	public List<LandlordTenant> fetchAll() {
		return landlordTenantRepo.findAll();
	}

	@Override
	public LandlordTenant fetchById(Integer id) {
		return landlordTenantRepo.findById(id).orElseThrow(() -> new UserException("Invalid Id"));
	}

	@Override
	public LandlordTenant update(LandlordTenant updateLandlordTenant, LandlordTenant existLandlordTenant) {
	    // Update non-foreign key fields
	    existLandlordTenant.setStartDate(updateLandlordTenant.getStartDate());
	    existLandlordTenant.setEndDate(updateLandlordTenant.getEndDate());
	    existLandlordTenant.setMonthlyRent(updateLandlordTenant.getMonthlyRent());
	    existLandlordTenant.setRentStatus(updateLandlordTenant.getRentStatus());
	    existLandlordTenant.setNextPaymentDate(updateLandlordTenant.getNextPaymentDate());
	    existLandlordTenant.setRentPaidOnTime(updateLandlordTenant.isRentPaidOnTime());

	    // Update foreign key relationships
	    if (updateLandlordTenant.getUserLandlord() != null) {
	    	User user = userRepository.findById(updateLandlordTenant.getUserLandlord().getUserId())
	    			.orElseThrow(() -> new UserException("User not found for this id :: " + updateLandlordTenant.getUserLandlord().getUserId()));
	        existLandlordTenant.setUserLandlord(user);
	    }
	    if (updateLandlordTenant.getUserTenant() != null) {
	    	User user = userRepository.findById(updateLandlordTenant.getUserTenant().getUserId())
	    			.orElseThrow(() -> new UserException("User not found for this id :: " + updateLandlordTenant.getUserTenant().getUserId()));
	        existLandlordTenant.setUserTenant(user);
	    }
	    if (updateLandlordTenant.getProperties() != null) {
	    	Properties properties = propertiesRepo.findById(updateLandlordTenant.getProperties().getPropertyId())
	    			.orElseThrow(() -> new UserException("Property not found for this id :: " + updateLandlordTenant.getProperties().getPropertyId()));
	        existLandlordTenant.setProperties(properties);
	    }
	    
	    return landlordTenantRepo.save(existLandlordTenant);
	}


	@Override
	public String delete(LandlordTenant deleteLandlordTenant) {
		landlordTenantRepo.delete(deleteLandlordTenant);
		return "Deleted rental ID : "+deleteLandlordTenant.getRentalId();
	}

}
