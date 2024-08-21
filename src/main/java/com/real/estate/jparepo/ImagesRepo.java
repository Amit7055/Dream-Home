package com.real.estate.jparepo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.Images;

public interface ImagesRepo extends JpaRepository<Images, Integer> { // Changed Long to Integer
	List<Images> findByUser_UserId(Integer userId);
    List<Images> findByPropertiesPropertyId(Integer propertyId); // Adjusted method name
}
