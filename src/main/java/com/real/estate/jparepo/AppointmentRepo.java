package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {

}
