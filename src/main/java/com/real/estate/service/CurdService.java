package com.real.estate.service;

import java.util.List;

public interface CurdService <T,K> {
	
	    //add
		T create(T t);
		
		//get all
		List<T> fetchAll();
		
		//get Id
		T fetchById(K k);
		
		//update
		T update (T t1, T t2);
		
		//delete
		 String delete(T t);		 

}