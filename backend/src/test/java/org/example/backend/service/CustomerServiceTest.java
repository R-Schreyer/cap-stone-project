package org.example.backend.service;

import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.repository.CustomerRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
class CustomerServiceTest {
    CustomerRepository customerRepository = mock(CustomerRepository.class);
    CustomerService customerService = new CustomerService(customerRepository);
    @Test
    void getAllCustomers() {
        //GIVEN
        Customer c1 = new Customer(null, "Max", "Mustermann", "lange-Strasse1", "max-mustermann@gmx.de");
        Customer c2 = new Customer(null, "Peter", "Pan", "lange-Strasse2", "peter-pan@gmx.de");
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
        Customer c3 = new Customer("001", "Peter", "Lustig", "lange-Strasse3", "peter-lustig@gmx.de");
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
        CustomerDTO customerDTO = new CustomerDTO("Max", "Mustermann", "lange-Strasse1", "max-mustermann@gmx.de");
        Customer customer = new Customer(null, "Max", "Mustermann", "lange-Strasse1", "max-mustermann@gmx.de");
        when(customerRepository.save(customer)).thenReturn(customer);
        //WHEN
        Customer actual = customerService.saveCustomer(customerDTO);
        //THEN
        verify(customerRepository).save(customer);
        assertEquals(customer, actual);
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