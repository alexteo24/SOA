package com.soa.productsmanagement.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ticket")
public class Ticket implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;
}
