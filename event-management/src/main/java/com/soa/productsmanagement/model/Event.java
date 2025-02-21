package com.soa.productsmanagement.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "event")
public class Event implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organiser")
    private String organiser;

    @Column(name = "performer")
    private String performer;

    @Column(name = "description")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private Double price;
}

