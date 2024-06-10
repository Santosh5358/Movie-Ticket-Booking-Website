package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.Passenger;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {

}

