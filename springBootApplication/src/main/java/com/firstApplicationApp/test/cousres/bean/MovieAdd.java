package com.firstApplicationApp.test.cousres.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MovieAdd {


    public MovieAdd(Long id, String movieName, String rating, String imgSrc) {
        this.id = id;
        this.movieName = movieName;
        this.rating = rating;
        this.imgSrc = imgSrc;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String movieName;
    private String rating;
//    private MultipartFile imageFile;

    @Override
    public String toString() {
        return "MovieAdd{" +
                "id=" + id +
                ", movieName='" + movieName + '\'' +
                ", rating='" + rating + '\'' +
                ", imgSrc='" + imgSrc + '\'' +
                '}';
    }

    private String imgSrc;

    public MovieAdd() {

    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
