package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Customer;
import org.example.backend.model.CustomerDTO;
import org.example.backend.model.Product;
import org.example.backend.model.ProductDTO;
import org.example.backend.service.CustomerService;
import org.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;
    @GetMapping
    public List<Product> getAllProducts(){
        return service.getAllProducts();
    }
    @GetMapping("{id}")
    public Product getProductById(@PathVariable String id) {
        return service.getProductById(id);
    }
    @Autowired
    private ProductService productService;
    @PostMapping
    public ResponseEntity<Product> saveNewProduct(@RequestBody ProductDTO productDTO) {
        Product newProduct = productService.saveProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }
    @PutMapping("{id}")
    public Product updateProductById(@PathVariable String id, @RequestBody ProductDTO product){
        return service.updateProduct(id, product);
    }
    @DeleteMapping("{id}")
    public void deleteProductById(@PathVariable String id){service.deleteProductById(id);}
}
