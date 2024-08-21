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
@Table(name = "MaintenanceRequest_Table")
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    private String description;
    private String status; 
    private Date requestDate;
    private Date completionDate;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Properties property;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public MaintenanceRequest() {
    }

    public MaintenanceRequest(int requestId, String description, String status, Date requestDate, Date completionDate, Properties property, User user) {
        this.requestId = requestId;
        this.description = description;
        this.status = status;
        this.requestDate = requestDate;
        this.completionDate = completionDate;
        this.property = property;
        this.user = user;
    }

    // Getters and Setters
    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
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

    @Override
    public String toString() {
        return "MaintenanceRequest [requestId=" + requestId + ", description=" + description + ", status=" + status 
                + ", requestDate=" + requestDate + ", completionDate=" + completionDate 
                + ", property=" + property + ", user=" + user + "]";
    }
}

