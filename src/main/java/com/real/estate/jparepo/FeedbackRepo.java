package com.real.estate.jparepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.real.estate.entity.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {

}
