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
    private final OrderRepository oderRepo;
    private final CustomerRepository customerRepo;

    public Order saveOrder(OrderDTO orderDTO) {

        Order savedOrder = oderRepo.save(new Order(null, orderDTO.productList(), orderDTO.price(), orderDTO.orderDate(), orderDTO.customerId()));
        Customer customer = customerRepo.findById(orderDTO.customerId()).orElseThrow(() -> new NoSuchElementException("Kunde nicht gefunden!"));
        customer.getCustomerOrderList().add(savedOrder);
        customerRepo.save(customer);
        return savedOrder;
    }

    public void deleteOrderById(String id) {
        Order order = oderRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Order not found with id: " + id));
        Customer customer = customerRepo.findById(order.getCustomerId())
                .orElseThrow(() -> new NoSuchElementException("Customer not found for order with id: " + id));
        customer.getCustomerOrderList().remove(order);
        customerRepo.save(customer);
        oderRepo.deleteById(id);
    }

    public void updateOrderById(String id, OrderDTO orderDTO) {
        Order order = oderRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Order not found with id: " + id));
        Customer customer = customerRepo.findById(order.getCustomerId())
                .orElseThrow(() -> new NoSuchElementException("Customer not found for order with id: " + id));
        customer.getCustomerOrderList().remove(order);
        order.setProductList(orderDTO.productList());
        order.setPrice(orderDTO.price());
        customer.getCustomerOrderList().add(order);
        customerRepo.save(customer);
        oderRepo.save(order);
    }

}
