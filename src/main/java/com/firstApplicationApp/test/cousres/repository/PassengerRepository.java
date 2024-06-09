package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.Passenger;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
//    List<BookApp> findOneAndUpdate(long id);
    List<Passenger> findByName(String name);
//    String<Passenger>

}

