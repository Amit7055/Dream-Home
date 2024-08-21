package com.real.estate.service;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.real.estate.customException.UserException;
import com.real.estate.dto.ImageDTO;
import com.real.estate.dto.PropertiesDTO;
import com.real.estate.dto.UserDTO;
import com.real.estate.entity.Images;
import com.real.estate.entity.Properties;
import com.real.estate.entity.User;
import com.real.estate.jparepo.ImagesRepo;

@Service
public class ImagesService {

	@Autowired
	private ImagesRepo imagesRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private PropertiesService propertiesService;

	public List<ImageDTO> getAll() {
	    // Retrieve all images from the repository
	    List<Images> imagesList = imagesRepo.findAll();
	    
	    // Convert each Images entity to ImageDTO
	    return imagesList.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}
	
	private ImageDTO convertToDTO(Images image) {
	    UserDTO userDTO = null;
	    PropertiesDTO propertiesDTO = null;

	    if (image.getUser() != null) {
	        userDTO = new UserDTO(
	            image.getUser().getUserId(),
	            image.getUser().getFirstName(),
	            image.getUser().getLastName(),
	            image.getUser().getEmail(),
	            image.getUser().getPhoneNo(),
	            image.getUser().getAddress(),
	            image.getUser().getCity(),
	            image.getUser().getState(),
	            image.getUser().getPincode(),
	            image.getUser().getUserName(),
	            image.getUser().getPassword(),
	            image.getUser().getStatus()
	        );
	    }

	    if (image.getProperties() != null) {
	        propertiesDTO = new PropertiesDTO(
	            image.getProperties().getPropertyId(),
	            image.getProperties().getType(),
	            image.getProperties().getPropertyType(),
	            image.getProperties().getGoogleMap(),
	            image.getProperties().getAddress(),
	            image.getProperties().getArea(),
	            image.getProperties().getCity(),
	            image.getProperties().getState(),
	            image.getProperties().getPrice(),
	            image.getProperties().getDescription(),
//	            image.getProperties().getImageAsBase64(),
	            image.getProperties().getBedroom(),
	            image.getProperties().getBathroom(),
	            image.getProperties().getStatus(),
	            image.getProperties().getSize(),
	            image.getProperties().getYearBuilt(),
	            userDTO  // Include userDTO only if needed
	        );
	    }

	    return new ImageDTO(
	        image.getId(),
	        image.getImageAsBase64(),
	        userDTO,
	        propertiesDTO
	    );
	}

	// Save images for a user
	public List<Images> saveImage(MultipartFile[] imageFiles, Integer userId) throws IOException {
		Set<Images> images = new HashSet<>();
		for (MultipartFile img : imageFiles) {
			Images image = new Images();
			image.setImagedata(img.getBytes());
			User userRef = userService.fetchById(userId);
			image.setUser(userRef);
			images.add(image);
		}
		return imagesRepo.saveAll(images);
	}

	// Save images for a property
	public List<Images> saveImageForPg(MultipartFile[] imageFiles, Integer propertyId) throws IOException {
		Set<Images> images = new HashSet<>();
		for (MultipartFile img : imageFiles) {
			Images image = new Images();
			image.setImagedata(img.getBytes());
			Properties propertyRef = propertiesService.fetchById(propertyId);
			image.setProperties(propertyRef);
			images.add(image);
		}
		return imagesRepo.saveAll(images);
	}

	// Get images by user ID
	public List<Images> getImagesDataByUserId(Integer userId) {
		List<Images> images = imagesRepo.findByUser_UserId(userId);
		if (images.isEmpty()) {
			throw new UserException("No images found for user ID: " + userId);
		}
		return images;
	}

	// Get images by property ID
	public List<Images> getImagesDataByPropertyId(Integer propertyId) {
		List<Images> images = imagesRepo.findByPropertiesPropertyId(propertyId);
		if (images.isEmpty()) {
			throw new UserException("No images found for property ID: " + propertyId);
		}
		return images;
	}

	// Get image by ID
	public Images getImageById(Integer imageId) {
		return imagesRepo.findById(imageId).orElseThrow(() -> new UserException("Image not found for ID: " + imageId));
	}

	// Delete image by ID
	public ResponseEntity<String> delete(Integer id) {
		Optional<Images> img = imagesRepo.findById(id);
		if (img.isPresent()) {
			imagesRepo.deleteById(id);
			return new ResponseEntity<>("Image deleted successfully", HttpStatus.OK);
		} else {
			throw new UserException("Image not found");
		}
	}

	// Get all images
	public List<Images> findAll() {
		return imagesRepo.findAll();
	}
}