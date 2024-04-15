package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Customer;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDTO;
import org.example.backend.repository.CustomerRepository;
import org.example.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repo;
    private final CustomerRepository customerRepo;

    public Order saveOrder(OrderDTO orderDTO) {
        Order savedOrder = repo.save(new Order(null, orderDTO.productList(), orderDTO.price(), orderDTO.orderDate(), orderDTO.customerId()));
        Customer customer = customerRepo.findById(orderDTO.customerId()).orElseThrow(() -> new NoSuchElementException("Kunde nicht gefunden!"));
        customer.getCustomerOrderList().add(savedOrder);
        customerRepo.save(customer);
        return savedOrder;
    }
}
