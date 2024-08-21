package com.real.estate.entity;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Appointment_Table")
public class Appointment {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appointmentId;
	private Date appointmentDate;
    private LocalTime appointmentTime;
    private long phoneNo;
    private String purpose;
    private String status;
    private String details;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Properties property;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    public Appointment() {
		// TODO Auto-generated constructor stub
	}

	public Appointment(int appointmentId, Date appointmentDate, LocalTime appointmentTime, long phoneNo, String purpose,
			String status, String details, Properties property, User user) {
		super();
		this.appointmentId = appointmentId;
		this.appointmentDate = appointmentDate;
		this.appointmentTime = appointmentTime;
		this.phoneNo = phoneNo;
		this.purpose = purpose;
		this.status = status;
		this.details = details;
		this.property = property;
		this.user = user;
	}



	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public Date getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public LocalTime getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(LocalTime appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

	public long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Properties getProperty() {
		return property;
	}

	public void setProperty(Properties property) {
		this.property = property;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	@Override
	public String toString() {
		return "Appointment [appointmentId=" + appointmentId + ", appointmentDate=" + appointmentDate
				+ ", appointmentTime=" + appointmentTime + ", phoneNo=" + phoneNo + ", purpose=" + purpose + ", status="
				+ status + ", property=" + property + ", user=" + user + "]";
	}

}
