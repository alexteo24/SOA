package com.soa.productsmanagement.service;

import com.soa.productsmanagement.model.Ticket;

import java.util.List;

public interface TicketService {
    Ticket createTicket(Ticket ticket);

    Integer findTicketCount(Long eventId);

    List<Ticket> findAllByUserId(Long userId);

    double computeTotal(Long userId);
}
