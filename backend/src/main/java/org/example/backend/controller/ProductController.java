package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Product;
import org.example.backend.model.ProductDTO;
import org.example.backend.service.ProductService;
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
    @PostMapping
    public ResponseEntity<Product> saveNewProduct(@RequestBody ProductDTO productDTO) {
        Product newProduct = service.saveProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable String id, @RequestBody ProductDTO product) {
        Product updatedProduct = service.updateProduct(id, product);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("{id}")
    public void deleteProductById(@PathVariable String id){service.deleteProductById(id);}
}
