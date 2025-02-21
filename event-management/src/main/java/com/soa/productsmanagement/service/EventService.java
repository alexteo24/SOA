package com.soa.productsmanagement.service;

import com.soa.productsmanagement.model.Event;

import java.util.List;

public interface EventService {
    List<Event> findAll();

    Event findByEventId(Long eventId);
}
