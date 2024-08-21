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
@Table(name = "Feedback_Table")
public class Feedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int feedbackId;

	private String content;
	private int rating;
	private Date feedbackDate;

	@ManyToOne
	@JoinColumn(name = "property_id")
	private Properties property;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	public Feedback() {
		// TODO Auto-generated constructor stub
	}

	public Feedback(int feedbackId, String content, int rating, Date feedbackDate, Properties property, User user) {
		super();
		this.feedbackId = feedbackId;
		this.content = content;
		this.rating = rating;
		this.feedbackDate = feedbackDate;
		this.property = property;
		this.user = user;
	}

	public int getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(int feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Date getFeedbackDate() {
		return feedbackDate;
	}

	public void setFeedbackDate(Date feedbackDate) {
		this.feedbackDate = feedbackDate;
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
		return "Feedback [feedbackId=" + feedbackId + ", content=" + content + ", rating=" + rating + ", feedbackDate="
				+ feedbackDate + ", property=" + property + ", user=" + user + "]";
	}

}
