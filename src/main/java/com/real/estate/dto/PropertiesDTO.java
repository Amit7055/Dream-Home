package com.real.estate.dto;

import jakarta.persistence.Lob;

public class PropertiesDTO {
	
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
//	private String image;
	private byte bedroom;
	private byte bathroom;
	private String status;
	private String size;
	private int yearBuilt;
    private UserDTO user;
    
    public PropertiesDTO() {
		// TODO Auto-generated constructor stub
	}

	public PropertiesDTO(int propertyId, String type, String propertyType, String googleMap, String address,
			String area, String city, String state, double price, String description, byte bedroom,
			byte bathroom, String status, String size, int yearBuilt, UserDTO user) {
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
//		this.image = image;
		this.bedroom = bedroom;
		this.bathroom = bathroom;
		this.status = status;
		this.size = size;
		this.yearBuilt = yearBuilt;
		this.user = user;
	}

	public int getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(int propertyId) {
		this.propertyId = propertyId;
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

//	public String getImage() {
//		return image;
//	}
//
//	public void setImage(String image) {
//		this.image = image;
//	}

	public byte getBedroom() {
		return bedroom;
	}

	public void setBedroom(byte bedroom) {
		this.bedroom = bedroom;
	}

	public byte getBathroom() {
		return bathroom;
	}

	public void setBathroom(byte bathroom) {
		this.bathroom = bathroom;
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

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

}
