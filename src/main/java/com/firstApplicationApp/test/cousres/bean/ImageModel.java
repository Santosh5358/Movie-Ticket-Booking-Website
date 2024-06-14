package com.firstApplicationApp.test.cousres.bean;

import jakarta.persistence.*;
import lombok.*;

@Entity
@ToString
@AllArgsConstructor
@Data
public class ImageModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;

    private String movieName;

    private String rating;
    @Lob
    @Column(name = "pic", columnDefinition = "LONGBLOB")
    private byte[] pic;

    public ImageModel( String name, String type, byte[] pic,String movieName,String rating) {

        this.name = name;
        this.type = type;
        this.pic = pic;
        this.movieName=movieName;
        this.rating=rating;
    }


    public ImageModel() {

    }


}
