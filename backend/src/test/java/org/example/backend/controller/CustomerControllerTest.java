package org.example.backend.controller;

import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CustomerService customerService;
    @Test
    @DirtiesContext
    void getAllCustomers() throws Exception {
        CustomerDTO customerToSave = new CustomerDTO("John", "Doe", "mühlweg1", "john-doe@gmx.de", new ArrayList<>());
        Customer customerSaved = customerService.saveCustomer(customerToSave);
        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                        "firstname":  "John",
                        "lastname":  "Doe",
                        "address":  "mühlweg1",
                        "email":  "john-doe@gmx.de"}]"""))
                .andExpect(jsonPath("$[0].id").value(customerSaved.getId()));
    }
    @Test
    @DirtiesContext
    void getCustomerById() throws Exception {
        CustomerDTO customerToSave = new CustomerDTO("John", "Doe", "mühlweg1", "john-doe@gmx.de", new ArrayList<>());
        Customer customerSaved = customerService.saveCustomer(customerToSave);
        mockMvc.perform(get("/api/customers/{id}", customerSaved.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(customerSaved.getId()))
                .andExpect(jsonPath("$.firstname").value("John"))
                .andExpect(jsonPath("$.lastname").value("Doe"))
                .andExpect(jsonPath("$.address").value("mühlweg1"))
                .andExpect(jsonPath("$.email").value("john-doe@gmx.de"));
    }
    @Test
    @DirtiesContext
    void saveNewCustomer() throws Exception {
        String customerJson = "{\"firstname\": \"Jane\", \"lastname\": \"Doe\", \"address\": \"mühlweg1\", \"email\": \"jane-doe@gmx.de\"}";
        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.firstname").value("Jane"))
                .andExpect(jsonPath("$.lastname").value("Doe"))
                .andExpect(jsonPath("$.address").value("mühlweg1"))
                .andExpect(jsonPath("$.email").value("jane-doe@gmx.de"));
    }
}

