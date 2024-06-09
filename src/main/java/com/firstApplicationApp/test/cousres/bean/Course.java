package com.firstApplicationApp.test.cousres.bean;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Course {
	@Id
	@GeneratedValue
	private long id;


	public Course(long id, String name, String author) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
	}

	public Course() {

	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getAuthor() {
		return author;
	}

	private String name;
	private String author;



	@Override
	public String toString() {
		return "Course [id= " + id + ", name= " + name + ", author= " + author + "]";
	}

}
