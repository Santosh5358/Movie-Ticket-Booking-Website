package com.firstApplicationApp.test.cousres.bean;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@AllArgsConstructor
@Data
public class ImageModel {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String type;
    @Lob
    private byte[] pic;

    public ImageModel( String name, String type, byte[] pic) {

        this.name = name;
        this.type = type;
        this.pic = pic;
    }


    public ImageModel() {

    }


}
