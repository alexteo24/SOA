package com.soa.productsmanagement.repository;

import com.soa.productsmanagement.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Integer countTicketByEvent_Id(Long eventId);

    List<Ticket> findAllByUserId(Long userId);
}
