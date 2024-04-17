package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDTO;
import org.example.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Order saveOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.saveOrder(orderDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderById(@PathVariable String id) {
        orderService.deleteOrderById(id);
    }

    @PutMapping("/{id}")
    public void updateOrderById(@PathVariable String id, @RequestBody OrderDTO orderDTO) {
        orderService.upadetOrderById(id, orderDTO);
    }
}
