package com.real.estate.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "User_table")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	private String firstName;
	private String lastName;
	private String email;
	private long phoneNo;
	private String address;
	private String city;
	private String state;
	private String pincode;
	private String userName;
	private String password;
	private String status;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Properties> properties;
	
	@OneToMany(mappedBy = "userLandlord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<LandlordTenant> landlordTenants;
	
	@OneToMany(mappedBy = "userTenant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<LandlordTenant> userTenant;
	
	@OneToMany(mappedBy = "ownerId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<BuySell> ownerId;
	
	@OneToMany(mappedBy = "buyerId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<BuySell> buyerId;

	@Column(name = "created_at", updatable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a")
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a")
	private LocalDateTime updatedAt;

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(int userId, String firstName, String lastName, String email, long phoneNo, String address, String city,
			String state, String pincode, String userName, String password ,String status) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNo = phoneNo;
		this.address = address;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.userName = userName;
		this.password = password;
		this.status = status;
	}

	public User(int userId, String firstName, String lastName, String email, long phoneNo, String address, String city,
			String state, String pincode, String userName, String password,String status ,List<Properties> properties) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNo = phoneNo;
		this.address = address;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.userName = userName;
		this.password = password;
		this.status = status;
		this.properties = properties;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Properties> getProperties() {
		return properties;
	}

	public void setProperties(List<Properties> properties) {
		this.properties = properties;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", phoneNo=" + phoneNo + ", address=" + address + ", city=" + city + ", state=" + state + ", pincode="
				+ pincode + ", userName=" + userName + ", password=" + password + ", status=" + status + ", properties="
				+ properties + ", landlordTenants=" + landlordTenants + ", userTenant=" + userTenant + ", ownerId="
				+ ownerId + ", buyerId=" + buyerId + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}

}
