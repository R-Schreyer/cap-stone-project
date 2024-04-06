package org.example.backend.controller;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService service;
    @GetMapping
    public List<Customer> getAllCustomers(){
        return service.getAllCustomers();
    }
    @GetMapping("{id}")
    public Customer getCustomerById(@PathVariable String id) {
        return service.getCustomerById(id);
    }

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> saveNewCustomer(@RequestBody CustomerDTO customerDTO) {
        Customer newCustomer = customerService.saveCustomer(customerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCustomer);
    }
    /*@PostMapping
    public Customer saveNewCustomer(@RequestBody CustomerDTO customer){
        return service.saveCustomer(customer);
    }
    */
    @PutMapping("{id}")
    public Customer updateCustomerById(@PathVariable String id, @RequestBody CustomerDTO customer){
       return service.updateCustomer(id, customer);
    }
    @DeleteMapping("{id}")
    public void deleteCustomerById(@PathVariable String id){service.deleteCustomerById(id);}

}
