package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.MovieAddWithImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepositoryWithImage extends JpaRepository<MovieAddWithImage, Long> {
}
