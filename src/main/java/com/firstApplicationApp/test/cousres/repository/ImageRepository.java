package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageModel,Long> {
}
