package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.Customer;
import org.example.backend.model.OrderDTO;
import org.example.backend.model.Product;
import org.example.backend.repository.CustomerRepository;
import org.example.backend.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ObjectMapper objectMapper;


    @Test
    @DirtiesContext
    void saveOrder() throws Exception {
        //GIVEN
        customerRepository.save(new Customer("abc", "Max", "Mustermann", "Mühlweg1", "max@mustermann.de", new ArrayList<>()));
        OrderDTO orderDTO = new OrderDTO(List.of(new Product("123", "Kaffee", "Getränke", BigDecimal.valueOf(3.99), "Tuba", "400g")), BigDecimal.valueOf(3.99), new Date(), "abc");
        String orderDTOJson = objectMapper.writeValueAsString(orderDTO);
        mockMvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON).content(orderDTOJson))
                .andExpect(status().isCreated());
    }

}
