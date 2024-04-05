package org.example.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import org.example.backend.controller.CustomerController;
import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CustomerService customerService;

    @Test
    @DirtiesContext
    public void getAllCustomers() throws Exception {
        CustomerDTO custemerToSave = new CustomerDTO ("John", "Doe");
        Customer customerSaved = customerService.saveCustomer(custemerToSave);
        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                        "firstname":  "John",
                        "lastname":  "Doe"}]"""))
                .andExpect(jsonPath("$[0].id").value(customerSaved.getId()));

    }
}
