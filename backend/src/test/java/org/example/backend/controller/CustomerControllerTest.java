package org.example.backend.controller;
/*import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.internal.verification.VerificationModeFactory.times;*/
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
@SpringBootTest
@AutoConfigureMockMvc
public class CustomerControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ObjectMapper objectMapper;
    /*@MockBean
    private CustomerService service;*/
    @Test
    @DirtiesContext
    public void getAllCustomers() throws Exception {
        CustomerDTO customerToSave = new CustomerDTO ("John", "Doe");
        Customer customerSaved = customerService.saveCustomer(customerToSave);
        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                        "firstname":  "John",
                        "lastname":  "Doe"}]"""))
                .andExpect(jsonPath("$[0].id").value(customerSaved.getId()));
    }
    @Test
    @DirtiesContext
    public void getCustomerById() throws Exception {
        CustomerDTO customerToSave = new CustomerDTO ("John", "Doe");
        Customer customerSaved = customerService.saveCustomer(customerToSave);
        mockMvc.perform(get("/api/customers/{id}", customerSaved.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(customerSaved.getId()))
                .andExpect(jsonPath("$.firstname").value("John"))
                .andExpect(jsonPath("$.lastname").value("Doe"));
    }
    @Test
    @DirtiesContext
    public void saveNewCustomer() throws Exception {
        String customerJson = "{\"firstname\": \"Jane\", \"lastname\": \"Doe\"}";
        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.firstname").value("Jane"))
                .andExpect(jsonPath("$.lastname").value("Doe"));
    }
    /*@Test
    @DirtiesContext
    void updateCustomerById()  throws Exception {
        // Given
        String customerId = "6611637bce485b181c17706f";
        CustomerDTO customerDTO = new CustomerDTO("John", "Doe");

        // When
        ResultActions resultActions = mockMvc.perform(put("/api/customers/{id}", customerId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDTO)));

        // Then
        resultActions.andExpect(status().isOk());
        // Additional assertions if needed

    }*/

    /*@Test
    @DirtiesContext
    void deleteCustomerById() throws Exception {
        CustomerDTO customerToSave = new CustomerDTO ("John", "Doe");
        Customer customerSaved = customerService.saveCustomer(customerToSave);
        String customerId = mockMvc.perform(get("/api/customers/{id}", customerSaved.getId()),

        // Mocking the service method
        doNothing().when(service).deleteCustomerById(customerId),

        // Performing the delete request
        mockMvc.perform(delete("/api/customers/{id}" + customerId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()));

        // Verifying that the service method was called
        verify(service, times(1)).deleteCustomerById(customerId);
    }*/

}

