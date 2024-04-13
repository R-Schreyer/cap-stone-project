package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository repo;
    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }
    public Customer saveCustomer(CustomerDTO customer) {
        return repo.save(new Customer(null, customer.firstname(), customer.lastname(), customer.address(), customer.email(), customer.customerOrderList()));
    }
    public Customer getCustomerById(String id){return repo.findById(id).orElseThrow();
    }
    public void deleteCustomerById(String id) {
        repo.deleteById(id);
    }

    public Customer updateCustomer(String id, CustomerDTO customerDTO ){
        Customer customer = getCustomerById(id);
        customer.setFirstname(customerDTO.firstname());
        customer.setLastname(customerDTO.lastname());
        customer.setAddress(customerDTO.address());
        customer.setEmail(customerDTO.email());
        return repo.save(customer);
    }
}
