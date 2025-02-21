package com.soa.productsmanagement.controller;

import com.soa.productsmanagement.intercomm.UserClient;
import com.soa.productsmanagement.model.Ticket;
import com.soa.productsmanagement.service.EventService;
import com.soa.productsmanagement.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController("/service")
public class EventController {
    @Autowired
    private UserClient userClient;

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private EventService eventService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private Environment env;

    @Value("${spring.application.name}")
    private String serviceId;

    @GetMapping("/port")
    public String getPort() {
        return "Service is working at port: " + env.getProperty("local.server.port");
    }

    @GetMapping("/instances")
    public ResponseEntity<?> getInstances() {
        return ResponseEntity.ok(discoveryClient.getInstances(serviceId));
    }

    @GetMapping("/events")
    public ResponseEntity<?> findAllEvents() {
        return ResponseEntity.ok(eventService.findAll());
    }

    @GetMapping("/events/{eventId}")
    public ResponseEntity<?> findByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.findByEventId(eventId));
    }

    @GetMapping("/events/{eventId}/ticket-count")
    public ResponseEntity<?> findTicketCount(@PathVariable Long eventId) {
        return ResponseEntity.ok(ticketService.findTicketCount(eventId));
    }

    @PostMapping("/ticket")
    public ResponseEntity<?> saveTicket(@RequestBody Ticket ticket) {
        ticket.setPurchaseDate(LocalDateTime.now());
        ticket.setEvent(eventService.findByEventId(ticket.getEvent().getId()));
        return new ResponseEntity<>(ticketService.createTicket(ticket), HttpStatus.CREATED);
    }

    @GetMapping("/ticket/user/{userId}")
    public ResponseEntity<?> findTicketsOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ticketService.findAllByUserId(userId));
    }

    @GetMapping("/ticket/total/{userId}")
    public ResponseEntity<?> computeTotalSpent(@PathVariable Long userId) {
        double total = ticketService.computeTotal(userId);
        if ( total == -1) {
            return ResponseEntity.internalServerError().build();
        } else {
            return ResponseEntity.ok(total);
        }
    }
}
