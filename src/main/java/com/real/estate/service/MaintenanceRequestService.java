package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.MaintenanceRequest;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.jparepo.MaintenanceRequestRepo;
import com.real.estate.jparepo.PropertiesRepo;
import com.real.estate.jparepo.UserRepo;

@Service
public class MaintenanceRequestService implements CurdService<MaintenanceRequest, Integer> {

	@Autowired
	private MaintenanceRequestRepo maintenanceRequestRepo;
	
	@Autowired
	private UserRepo userRepository;
	
	@Autowired
	private PropertiesRepo propertiesRepo;
	
	@Override
	public MaintenanceRequest create(MaintenanceRequest t) {
		return maintenanceRequestRepo.save(t);
	}

	@Override
	public List<MaintenanceRequest> fetchAll() {
		// TODO Auto-generated method stub
		return maintenanceRequestRepo.findAll();
	}

	@Override
	public MaintenanceRequest fetchById(Integer id) {
		// TODO Auto-generated method stub
		return maintenanceRequestRepo.findById(id).orElseThrow(() -> new UserException("Invalid Id"));
	}

	@Override
	public MaintenanceRequest update(MaintenanceRequest updateMaintenanceRequest, MaintenanceRequest existMaintenanceRequest) {
		existMaintenanceRequest.setCompletionDate(updateMaintenanceRequest.getCompletionDate());
		existMaintenanceRequest.setDescription(updateMaintenanceRequest.getDescription());
		existMaintenanceRequest.setProperty(updateMaintenanceRequest.getProperty());
		existMaintenanceRequest.setRequestDate(updateMaintenanceRequest.getRequestDate());
		existMaintenanceRequest.setStatus(updateMaintenanceRequest.getStatus());
		
		if (updateMaintenanceRequest.getUser() != null && updateMaintenanceRequest.getUser().getUserId() != 0) {
	        User user = userRepository.findById(updateMaintenanceRequest.getUser().getUserId())
	        		.orElseThrow(() -> new UserException("User not found for this id :: " + updateMaintenanceRequest.getUser().getUserId()));
	        existMaintenanceRequest.setUser(user);
	    }
		if (updateMaintenanceRequest.getProperty() != null) {
	    	Properties properties = propertiesRepo.findById(updateMaintenanceRequest.getProperty().getPropertyId())
	    			.orElseThrow(() -> new UserException("Property not found for this id :: " + updateMaintenanceRequest.getProperty().getPropertyId()));
	    	existMaintenanceRequest.setProperty(properties);
	    }
		
		return maintenanceRequestRepo.save(existMaintenanceRequest);
	}

	@Override
	public String delete(MaintenanceRequest deleteMaintenanceRequest) {
		maintenanceRequestRepo.delete(deleteMaintenanceRequest);
		return "Deleted "+ deleteMaintenanceRequest.getRequestId();
	}

}
