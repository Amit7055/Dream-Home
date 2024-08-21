package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.Admin;
import com.real.estate.jparepo.AdminRepo;

@Service
public class AdminService implements CurdService<Admin, Integer> {

	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Override
	public Admin create(Admin newAdmin) {
		String encodedPassword = passwordEncoder.encode(newAdmin.getPassword());
		newAdmin.setPassword(encodedPassword);
		return adminRepo.save(newAdmin);
	}

	@Override
	public List<Admin> fetchAll() {
		// TODO Auto-generated method stub
		return adminRepo.findAll();
	}

	@Override
	public Admin fetchById(Integer id) {
		// TODO Auto-generated method stub
		return adminRepo.findById(id).orElseThrow(() ->new UserException("Invalid Admin Id"));
	}

	@Override
	public Admin update(Admin updateAdmin, Admin existAdmin) {
		existAdmin.setFirstName(updateAdmin.getFirstName());
		existAdmin.setLastName(updateAdmin.getLastName());
		existAdmin.setUserName(updateAdmin.getUserName());
		existAdmin.setPassword(updateAdmin.getPassword());
		return adminRepo.save(existAdmin);
	}

	@Override
	public String delete(Admin deleteAdmin) {
		adminRepo.delete(deleteAdmin);
		return "Delete" + deleteAdmin.getAdminId();
	}

}
