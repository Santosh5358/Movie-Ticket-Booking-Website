package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.MovieAdd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<MovieAdd, Long> {

    @Query("select p FROM MovieAdd p WHERE p.movieName = :name")
    MovieAdd findByName(String name);
//    @Query("DELETE FROM MovieAdd p WHERE p.movieName = :name")
//    boolean deleteByName(@Param("name") String name);
}
