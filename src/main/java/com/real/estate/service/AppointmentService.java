package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.Appointment;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.jparepo.AppointmentRepo;
import com.real.estate.jparepo.PropertiesRepo;
import com.real.estate.jparepo.UserRepo;

@Service
public class AppointmentService implements CurdService<Appointment, Integer> {
	
	@Autowired
	private AppointmentRepo appointmentRepo;
	
	@Autowired
	private UserRepo userRepository;
	
	@Autowired
	private PropertiesRepo propertiesRepo;

	@Override
	public Appointment create(Appointment t) {
		// TODO Auto-generated method stub
		return appointmentRepo.save(t);
	}

	@Override
	public List<Appointment> fetchAll() {
		// TODO Auto-generated method stub
		return appointmentRepo.findAll();
	}

	@Override
	public Appointment fetchById(Integer id) {
		// TODO Auto-generated method stub
		return appointmentRepo.findById(id).orElseThrow(() -> new UserException("Invalid Id"));
	}

	@Override
	public Appointment update(Appointment updateAppointment, Appointment existAppointment) {
	    // Update fields
	    existAppointment.setAppointmentTime(updateAppointment.getAppointmentTime());
	    existAppointment.setPhoneNo(updateAppointment.getPhoneNo());
	    existAppointment.setAppointmentDate(updateAppointment.getAppointmentDate());
	    existAppointment.setPurpose(updateAppointment.getPurpose());
	    existAppointment.setStatus(updateAppointment.getStatus());
	    existAppointment.setDetails(updateAppointment.getDetails());
	    
	    // Update the user (foreign key)
	    if (updateAppointment.getUser() != null && updateAppointment.getUser().getUserId() != 0) {
	        User user = userRepository.findById(updateAppointment.getUser().getUserId())
	                .orElseThrow(() -> new UserException("User not found for this id :: " + updateAppointment.getUser().getUserId()));
	        existAppointment.setUser(user);
	    }
	    if (updateAppointment.getProperty() != null && updateAppointment.getProperty().getPropertyId() != 0) {
	        Properties property = propertiesRepo.findById(updateAppointment.getProperty().getPropertyId())
	                .orElseThrow(() -> new UserException("Property not found for this id :: " + updateAppointment.getProperty().getPropertyId()));
	        existAppointment.setProperty(property);
	    }
	    
	    return appointmentRepo.save(existAppointment);
	}

	@Override
	public String delete(Appointment deleteAppointment) {
		appointmentRepo.delete(deleteAppointment);
		return "Deleted "+ deleteAppointment.getAppointmentId();
	}
	
	

}
