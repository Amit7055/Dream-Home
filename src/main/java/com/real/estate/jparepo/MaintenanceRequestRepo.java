package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.MaintenanceRequest;

public interface MaintenanceRequestRepo extends JpaRepository<MaintenanceRequest, Integer> {

}
