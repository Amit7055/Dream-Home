package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.real.estate.entity.User;

public interface UserRepo extends JpaRepository<User, Integer>{

	User findByuserName(String userName);
	
}