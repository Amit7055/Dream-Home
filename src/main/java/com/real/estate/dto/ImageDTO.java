package com.real.estate.dto;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.real.estate.entity.Properties;
import com.real.estate.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

public class ImageDTO {
	
	    private int id;

	    private String imagedata;

	    private UserDTO user;

	    private PropertiesDTO properties;
	    
	    public ImageDTO() {
			// TODO Auto-generated constructor stub
		}

		public ImageDTO(int id, String imagedata, UserDTO user, PropertiesDTO properties) {
			super();
			this.id = id;
			this.imagedata = imagedata;
			this.user = user;
			this.properties = properties;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getImagedata() {
			return imagedata;
		}

		public void setImagedata(String imagedata) {
			this.imagedata = imagedata;
		}

		public UserDTO getUser() {
			return user;
		}

		public void setUser(UserDTO user) {
			this.user = user;
		}

		public PropertiesDTO getProperties() {
			return properties;
		}

		public void setProperties(PropertiesDTO properties) {
			this.properties = properties;
		}
	    
	    

}
