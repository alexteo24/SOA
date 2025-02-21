package com.soa.productsmanagement.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.soa.productsmanagement.model.Ticket;
import com.soa.productsmanagement.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Value("${lambdaURL}")
    private String lambdaUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public Integer findTicketCount(Long eventId) {
        return ticketRepository.countTicketByEvent_Id(eventId);
    }

    @Override
    public List<Ticket> findAllByUserId(Long userId) {
        return ticketRepository.findAllByUserId(userId);
    }

    @Override
    public double computeTotal(Long userId) {
        var tickets = this.findAllByUserId(userId);

        List<Map<String, Object>> ticketsList = tickets.stream()
                .map(ticket -> {
                    Map<String, Object> eventDetails = new HashMap<>();
                    eventDetails.put("price", ticket.getEvent().getPrice());

                    Map<String, Object> ticketMap = new HashMap<>();
                    ticketMap.put("event", eventDetails);
                    return ticketMap;
                })
                .collect(Collectors.toList());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<Map<String, Object>>> request = new HttpEntity<>(ticketsList, headers);
        ResponseEntity<String> response = restTemplate.exchange(lambdaUrl, HttpMethod.POST, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                return jsonNode.get("totalSpent").asDouble();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return -1;
            }
        }
        return 0.0;
    }
}
