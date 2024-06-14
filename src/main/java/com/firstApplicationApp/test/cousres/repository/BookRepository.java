package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.BookApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<BookApp, Long> {

    @Query("SELECT b FROM BookApp b JOIN b.passengers p WHERE p.name = :passengerName" )
    List<BookApp> findBookIdByPassengerName(@Param("passengerName") String passengerName);

    List<BookApp> findByEmail(String email);
    List<BookApp> findByselectedMovie(String selectedMovie);
//    List<BookApp> findByName(String name);

    @Query("SELECT b FROM BookApp b") // Retrieve all records (including deleted ones)
    List<BookApp> findAllRecords();

    @Query("SELECT p FROM BookApp p WHERE p.deleted = true ")
    List<BookApp> findByDeleted();
//    void updateAmountById(long id,int amount);
}

