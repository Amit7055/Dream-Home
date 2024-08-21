package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {

}
