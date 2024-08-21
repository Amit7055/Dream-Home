package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.Properties;

public interface PropertiesRepo extends JpaRepository<Properties, Integer>{
	
	
	
}
