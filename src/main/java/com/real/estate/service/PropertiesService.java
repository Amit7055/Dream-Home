package com.real.estate.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.dto.PropertiesDTO;
import com.real.estate.dto.UserDTO;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.jparepo.PropertiesRepo;
import com.real.estate.jparepo.UserRepo;

@Service
public class PropertiesService implements CurdService<Properties, Integer> {

	@Autowired
	private PropertiesRepo propertiesRepo;

	@Autowired
	private UserRepo userRepository;

	@Override
	public Properties create(Properties properties) {
		return propertiesRepo.save(properties);
	}

	@Override
	public List<Properties> fetchAll() {
		return propertiesRepo.findAll();
	}

	public List<PropertiesDTO> getAll() {
		List<Properties> propertiesList = propertiesRepo.findAll();
		return propertiesList.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private PropertiesDTO convertToDTO(Properties property) {
		PropertiesDTO dto = new PropertiesDTO(property.getPropertyId(), 
				property.getType(), property.getPropertyType(),
				property.getGoogleMap(), property.getAddress(), 
				property.getArea(), property.getCity(),
				property.getState(), property.getPrice(), 
				property.getDescription(), 
//				property.getImageAsBase64(),
				property.getBedroom(), property.getBathroom(), property.getStatus(), property.getSize(),
				property.getYearBuilt(),
				new UserDTO(property.getUser().getUserId(), property.getUser().getFirstName(),
						property.getUser().getLastName(), property.getUser().getEmail(),
						property.getUser().getPhoneNo(), property.getUser().getAddress(), property.getUser().getCity(),
						property.getUser().getState(), property.getUser().getPincode(),
						property.getUser().getUserName(), property.getUser().getPassword(),
						property.getUser().getStatus()));
		return dto;
	}

	@Override
	public Properties fetchById(Integer propertyId) {
		return propertiesRepo.findById(propertyId).orElseThrow(() -> new UserException("Invalid Id"));
	}

	public Properties update(Properties updatedProperty, Properties existingProperty) {
		existingProperty.setType(updatedProperty.getType());
		existingProperty.setPropertyType(updatedProperty.getPropertyType());
		existingProperty.setGoogleMap(updatedProperty.getGoogleMap());
		existingProperty.setAddress(updatedProperty.getAddress());
		existingProperty.setArea(updatedProperty.getArea());
		existingProperty.setCity(updatedProperty.getCity());
		existingProperty.setState(updatedProperty.getState());
		existingProperty.setPrice(updatedProperty.getPrice());
		existingProperty.setDescription(updatedProperty.getDescription());
//		existingProperty.setImage(updatedProperty.getImage());
		existingProperty.setBedroom(updatedProperty.getBedroom());
		existingProperty.setBathroom(updatedProperty.getBathroom());
		existingProperty.setStatus(updatedProperty.getStatus());
		existingProperty.setYearBuilt(updatedProperty.getYearBuilt());
		existingProperty.setSize(updatedProperty.getSize());

		// Update the user (foreign key)
		if (updatedProperty.getUser() != null && updatedProperty.getUser().getUserId() != 0) {
			User user = userRepository.findById(updatedProperty.getUser().getUserId()).orElseThrow(
					() -> new UserException("User not found for this id :: " + updatedProperty.getUser().getUserId()));
			existingProperty.setUser(user);
		}

		return propertiesRepo.save(existingProperty);
	}

	@Override
	public String delete(Properties deleteProperty) {
		propertiesRepo.delete(deleteProperty);
		return "Delete : " + deleteProperty.getPropertyId();
	}

}