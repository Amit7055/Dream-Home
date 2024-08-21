package com.real.estate.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "BuySell_Table")
public class BuySell {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buy_sell_id")
	private int buySellId;
    private double bookingAmount;
    private double totalAmount;
    private String status;
    private Date bookingDate;
    
    @ManyToOne
	@JoinColumn(name = "property_id")
	private Properties properties;
    
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User ownerId;
    
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyerId;
    
    public BuySell() {
		// TODO Auto-generated constructor stub
	}

	public BuySell(int buySellId, double bookingAmount, double totalAmount, String status, Date bookingDate,
			Properties properties, User ownerId, User buyerId) {
		super();
		this.buySellId = buySellId;
		this.bookingAmount = bookingAmount;
		this.totalAmount = totalAmount;
		this.status = status;
		this.bookingDate = bookingDate;
		this.properties = properties;
		this.ownerId = ownerId;
		this.buyerId = buyerId;
	}

	public int getBuySellId() {
		return buySellId;
	}

	public void setBuySellId(int buySellId) {
		this.buySellId = buySellId;
	}

	public double getBookingAmount() {
		return bookingAmount;
	}

	public void setBookingAmount(double bookingAmount) {
		this.bookingAmount = bookingAmount;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}

	public Properties getProperties() {
		return properties;
	}

	public void setProperties(Properties properties) {
		this.properties = properties;
	}

	public User getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(User ownerId) {
		this.ownerId = ownerId;
	}

	public User getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(User buyerId) {
		this.buyerId = buyerId;
	}
	
}