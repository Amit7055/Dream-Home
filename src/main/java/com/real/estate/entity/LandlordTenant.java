package com.real.estate.entity;

import java.sql.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "LandlordTenant_Table")
public class LandlordTenant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rentalId;
    private Date startDate;
    private Date endDate;
    private double monthlyRent;
    private String rentStatus;
    private Date nextPaymentDate;
    private boolean isRentPaidOnTime;
    
    @ManyToOne
	@JoinColumn(name = "property_id")
	private Properties properties;
    
    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User userLandlord;
    
    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private User userTenant;

    public LandlordTenant() {
        // Default constructor
    }
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
    	// TODO Auto-generated method stub
    	return super.clone();
    }

    public LandlordTenant(int rentalId, Date startDate, Date endDate, double monthlyRent, String rentStatus,
			Date nextPaymentDate, boolean isRentPaidOnTime, Properties properties, User userLandlord, User userTenant) {
		super();
		this.rentalId = rentalId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.monthlyRent = monthlyRent;
		this.rentStatus = rentStatus;
		this.nextPaymentDate = nextPaymentDate;
		this.isRentPaidOnTime = isRentPaidOnTime;
		this.properties = properties;
		this.userLandlord = userLandlord;
		this.userTenant = userTenant;
	}
    
    

    public Properties getProperties() {
		return properties;
	}


	public void setProperties(Properties properties) {
		this.properties = properties;
	}


	// Getters and Setters
    public int getRentalId() {
        return rentalId;
    }

    public void setRentalId(int rentalId) {
        this.rentalId = rentalId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public double getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(double monthlyRent) {
        this.monthlyRent = monthlyRent;
    }

    public String getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(String rentStatus) {
        this.rentStatus = rentStatus;
    }

    public Date getNextPaymentDate() {
        return nextPaymentDate;
    }

    public void setNextPaymentDate(Date nextPaymentDate) {
        this.nextPaymentDate = nextPaymentDate;
    }

    public boolean isRentPaidOnTime() {
        return isRentPaidOnTime;
    }

    public void setRentPaidOnTime(boolean isRentPaidOnTime) {
        this.isRentPaidOnTime = isRentPaidOnTime;
    }

    public User getUserLandlord() {
        return userLandlord;
    }

    public void setUserLandlord(User userLandlord) {
        this.userLandlord = userLandlord;
    }

    public User getUserTenant() {
        return userTenant;
    }

    public void setUserTenant(User userTenant) {
        this.userTenant = userTenant;
    }

    @Override
    public String toString() {
        return "LandlordTenant [rentalId=" + rentalId + ", startDate=" + startDate + ", endDate=" + endDate
                + ", monthlyRent=" + monthlyRent + ", rentStatus=" + rentStatus + ", nextPaymentDate="
                + nextPaymentDate + ", isRentPaidOnTime=" + isRentPaidOnTime + ", userLandlord=" + userLandlord
                + ", userTenant=" + userTenant + "]";
    }
}
