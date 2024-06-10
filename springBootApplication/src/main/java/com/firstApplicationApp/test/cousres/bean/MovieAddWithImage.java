package com.firstApplicationApp.test.cousres.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.awt.*;
import java.io.InputStream;
import java.math.BigDecimal;

@Entity
public class MovieAddWithImage {
    @Id
    private Long id;
    private String movieName;
    private double rating;
    @Lob
    @Column(name = "pic")
    private byte[] imgSrc; // Store the image as a byte array (LONGBLOB)

    public MovieAddWithImage(String name, double rating, byte[] image) {
        this.movieName = name;
        this.rating = rating;
        this.imgSrc = image;
    }

    public MovieAddWithImage() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return movieName;
    }

    public void setName(String name) {
        this.movieName = name;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public byte[] getImage() {
        return imgSrc;
    }

    public void setImage(byte[] image) {
        this.imgSrc = image;
    }
}
