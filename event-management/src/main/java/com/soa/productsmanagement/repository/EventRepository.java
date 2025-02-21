package com.soa.productsmanagement.repository;

import com.soa.productsmanagement.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
