package com.real.estate.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "Properties_table")
public class Properties {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int propertyId;
	private String type;
	private String propertyType;
	private String googleMap;
	private String address;
	private String area;
	private String city;
	private String state;
	private double price;
	private String description;
	private byte bedroom;
	private byte bathroom;
	private String status;
	private String size;
	private int yearBuilt;

	@Column(name = "created_at", updatable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a")
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a")
	private LocalDateTime updatedAt;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "properties", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<LandlordTenant> landlordTenants;

	public Properties() {
		// TODO Auto-generated constructor stub
	}

	public Properties(int propertyId, String type, String propertyType, String googleMap, String address, String area,
			String city, String state, double price, String description, byte bedroom, byte bathroom,
			String status, String size, int yearBuilt ,User user) {
		super();
		this.propertyId = propertyId;
		this.type = type;
		this.propertyType = propertyType;
		this.googleMap = googleMap;
		this.address = address;
		this.area = area;
		this.city = city;
		this.state = state;
		this.price = price;
		this.description = description;
		this.bedroom = bedroom;
		this.bathroom = bathroom;
		this.status = status;
		this.size = size;
		this.yearBuilt = yearBuilt;
		this.user=user;
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

	public int getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(int property_id) {
		this.propertyId = property_id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getGoogleMap() {
		return googleMap;
	}

	public void setGoogleMap(String googleMap) {
		this.googleMap = googleMap;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte getBedroom() {
		return bedroom;
	}

	public void setBedroom(byte numberOfBedroom) {
		this.bedroom = numberOfBedroom;
	}

	public byte getBathroom() {
		return bathroom;
	}

	public void setBathroom(byte numberOfBathroom) {
		this.bathroom = numberOfBathroom;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getYearBuilt() {
        return yearBuilt;
    }

    public void setYearBuilt(int yearBuilt) {
        this.yearBuilt = yearBuilt;
    }
    
//    public String getImageAsBase64() {
//        if (image != null) {
//            return Base64.getEncoder().encodeToString(image);
//        }
//        return null;
//    }
     
}
