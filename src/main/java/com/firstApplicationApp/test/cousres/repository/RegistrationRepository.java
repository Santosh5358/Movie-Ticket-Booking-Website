package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByEmail (String email);
    boolean existsByEmail (String email);


    @Query("SELECT p.name,p.email,p.number FROM Registration p WHERE p.email = :email and p.password=:password")
    Registration findByEmailAndPassword (String email, String password);

}
