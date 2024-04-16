package org.example.backend.service;

import org.example.backend.model.Customer;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDTO;
import org.example.backend.model.Product;
import org.example.backend.repository.CustomerRepository;
import org.example.backend.repository.OrderRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class OrderServiceTest {
    OrderRepository orderRepository = mock(OrderRepository.class);
    CustomerRepository customerRepository = mock(CustomerRepository.class);
    OrderService orderService = new OrderService(orderRepository, customerRepository);


    @Test
    void saveOrder() {
        //GIVEN
        List<Product> productList = new ArrayList<>();
        List<Order> customerOrderList = new ArrayList<>();
        BigDecimal priceBanana = BigDecimal.valueOf(1.99);
        BigDecimal priceMango = BigDecimal.valueOf(2.99);
        BigDecimal price = BigDecimal.valueOf(4.98);
        Product product1 = new Product("abc", "Bananen", "Obst", priceBanana);
        Product product2 = new Product("bcd", "Mango", "Obst", priceMango);
        productList.add(product1);
        productList.add(product2);
        Calendar calendar = Calendar.getInstance();
        calendar.set(2024, Calendar.APRIL, 15);
        Date orderDate = calendar.getTime();
        OrderDTO orderDTO = new OrderDTO(productList, price, orderDate, "abc");
        Order order = new Order(null, productList, price, orderDate, "abc");
        Customer customer = new Customer("abc", "Max", "Mustermann", "Mühlweg1", "max@mustermann.de", customerOrderList);
        when(customerRepository.findById("abc")).thenReturn(Optional.of(customer));
        when(orderRepository.save(order)).thenReturn(order);
        //WHEN
        Order actual = orderService.saveOrder(orderDTO);
        //THEN
        verify(orderRepository).save(order);
        assertEquals(order, actual);
    }
}
