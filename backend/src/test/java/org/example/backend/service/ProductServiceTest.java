package org.example.backend.service;
import org.example.backend.model.Product;
import org.example.backend.model.ProductDTO;
import org.example.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ProductServiceTest {
    ProductRepository productRepository = mock(ProductRepository.class);
    ProductService productService = new ProductService(productRepository);
    @Test
    void getAllProducts() {
        //GIVEN
        BigDecimal price1 = BigDecimal.valueOf(0.29);
        BigDecimal price2 = BigDecimal.valueOf(0.39);
        Product p1 = new Product(null, "Water", "Drinks", price1);
        Product p2 = new Product(null, "Milk", "Drinks", price2);
        List<Product> products = List.of(p1, p2);
        when(productRepository.findAll()).thenReturn(products);
        //WHEN
        List<Product> actual = productService.getAllProducts();
        //THEN
        verify(productRepository).findAll();
        assertEquals(products, actual);
    }
    @Test
    void getProductById() {
        //GIVEN
        BigDecimal price3 =BigDecimal.valueOf(0.69);
        Product p3 = new Product("001", "Bread", "Food", price3);
        when(productRepository.findById("001")).thenReturn(Optional.of(p3));
        //WHEN
        Product actual = productService.getProductById("001");
        //THEN
        verify(productRepository).findById("001");
        assertEquals(p3, actual);
    }
    @Test
    void saveProduct() {
        //GIVEN
        BigDecimal price = BigDecimal.valueOf(0.29);
        ProductDTO p1 = new ProductDTO("Water", "Drinks", price);
        Product p2 = new Product(null, "Water", "Drinks", price);
        when(productRepository.save(p2)).thenReturn(p2);
        //WHEN
        Product actual = productService.saveProduct(p1);
        //THEN
        verify(productRepository).save(p2);
        assertEquals(p2, actual);
    }
    @Test
    void deleteProductById() {
        //GIVEN
        doNothing().when(productRepository).deleteById("001");
        //WHEN
        productService.deleteProductById("001");
        //THEN
        verify(productRepository).deleteById("001");

    }
}
