package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.LandlordTenant;

public interface LandlordTenantRepo extends JpaRepository<LandlordTenant, Integer> {

}
