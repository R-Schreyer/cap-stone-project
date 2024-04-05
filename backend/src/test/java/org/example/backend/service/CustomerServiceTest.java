package org.example.backend.service;

import net.bytebuddy.NamingStrategy;
import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.repository.CustomerRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class CustomerServiceTest {
    CustomerRepository customerRepository = mock(CustomerRepository.class);
    CustomerService customerService = new CustomerService(customerRepository);
    @Test
    void getAllCustomers() {
        //GIVEN
        Customer c1 = new Customer(null, "Max", "Mustermann");
        Customer c2 = new Customer(null, "Peter", "Pan");
        List<Customer> customers = List.of(c1, c2);
        when(customerRepository.findAll()).thenReturn(customers);
        //WHEN
        List<Customer> actual = customerService.getAllCustomers();
        //THEN
        verify(customerRepository).findAll();
        assertEquals(customers, actual);
    }
    @Test
    void getCustomerById() {
        //GIVEN
        Customer c3 = new Customer("001", "Peter", "Lustig");
        when(customerRepository.findById("001")).thenReturn(Optional.of(c3));
        //WHEN
        Customer actual = customerService.getCustomerById("001");
        //THEN
        verify(customerRepository).findById("001");
        assertEquals(c3, actual);
    }
    @Test
    void saveCustomer() {
        //GIVEN
        CustomerDTO c1 = new CustomerDTO("Max", "Mustermann");
        Customer c2 = new Customer(null, "Max", "Mustermann");
                when(customerRepository.save(c2)).thenReturn(c2);
        //WHEN
        Customer actual = customerService.saveCustomer(c1);
        //THEN
        verify(customerRepository).save(c2);
        assertEquals(c2, actual);
    }
    @Test
    void deleteCustomerById() {
    //GIVEN
        doNothing().when(customerRepository).deleteById("001");
        //WHEN
        customerService.deleteCustomerById("001");
        //THEN
        verify(customerRepository).deleteById("001");

    }
    @Test
    void updateCustomer() {
    }
}