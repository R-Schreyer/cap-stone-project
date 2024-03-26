package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Customer;
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
    public Customer saveCustomer(Customer customer) {
        repo.save(customer);
        return repo.findById(customer.getId()).orElseThrow();
    }
    public Customer getCustomerById(String id){return repo.findById(id).orElseThrow();
    }
    public void deleteCustomerById(String id) {
        repo.deleteById(id);
    }


}
