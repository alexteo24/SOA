package com.soa.productsmanagement.service;

import com.soa.productsmanagement.model.Event;
import com.soa.productsmanagement.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event findByEventId(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }
}
