package com.firstApplicationApp.test.cousres.repository;

import com.firstApplicationApp.test.cousres.bean.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
