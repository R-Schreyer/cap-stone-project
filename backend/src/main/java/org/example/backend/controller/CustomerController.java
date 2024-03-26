package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Customer;
import org.example.backend.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService service;
    @GetMapping
    public List<Customer> getAllCustomers(){
        List<Customer> allCustomers = service.getAllCustomers();
        return allCustomers;
    }
    @GetMapping("{id}")
    public Customer getCustomerById(@PathVariable String id) {
        return service.getCustomerById(id);
    }
    @PostMapping
    public Customer saveNewCustomer(@RequestBody Customer customer){
        return service.saveCustomer(customer);
    }
    @PutMapping("{id}")
    public Customer updateCustomerById(@PathVariable String id, @RequestBody Customer customer){
        if (!customer.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No customer found with this id!");
        }
        return service.saveCustomer(customer);
    }
    @DeleteMapping("{id}")
    public void deleteCustomerById(@PathVariable String id){service.deleteCustomerById(id);}

}
