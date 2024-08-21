package com.real.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.real.estate.customException.UserException;
import com.real.estate.entity.Feedback;
import com.real.estate.entity.User;
import com.real.estate.jparepo.FeedbackRepo;
import com.real.estate.jparepo.UserRepo;

@Service
public class FeedbackService implements CurdService<Feedback, Integer> {

	@Autowired
	private FeedbackRepo feedbackRepo;
	
	@Autowired
	private UserRepo userRepository;
	
	@Override
	public Feedback create(Feedback t) {
		return feedbackRepo.save(t);
	}

	@Override
	public List<Feedback> fetchAll() {
		// TODO Auto-generated method stub
		return feedbackRepo.findAll();
	}

	@Override
	public Feedback fetchById(Integer id) {
		// TODO Auto-generated method stub
		return feedbackRepo.findById(id).orElseThrow(() -> new UserException("Invalid Id"));
	}

	@Override
	public Feedback update(Feedback updateFeedback, Feedback existFeedback) {
		existFeedback.setContent(updateFeedback.getContent());
		existFeedback.setFeedbackDate(updateFeedback.getFeedbackDate());
		existFeedback.setProperty(updateFeedback.getProperty());
		existFeedback.setRating(updateFeedback.getRating());
		
		// Update the user (foreign key)
	    if (updateFeedback.getUser() != null && updateFeedback.getUser().getUserId() != 0) {
	        User user = userRepository.findById(updateFeedback.getUser().getUserId())
	        		.orElseThrow(() -> new UserException("User not found for this id :: " + updateFeedback.getUser().getUserId()));
	        existFeedback.setUser(user);
	    }
		return feedbackRepo.save(existFeedback);
	}

	@Override
	public String delete(Feedback deleteFeedback) {
		feedbackRepo.delete(deleteFeedback);
		return "Deleted "+ deleteFeedback.getFeedbackId();
	}
	
}
