package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.MovieAdd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<MovieAdd, Long> {

}
