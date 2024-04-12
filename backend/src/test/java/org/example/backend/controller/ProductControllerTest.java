package org.example.backend.controller;

import org.example.backend.model.Product;
import org.example.backend.model.ProductDTO;
import org.example.backend.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ProductService productService;
    @Test
    @DirtiesContext
    void getAllProducts() throws Exception {
        BigDecimal price = BigDecimal.valueOf(0.29);
        ProductDTO productToSave = new ProductDTO ("Water", "Drinks", price);
        Product productSaved = productService.saveProduct(productToSave);
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                        "productName":  "Water",
                        "category":  "Drinks",
                        "pricePerPiece":  0.29}]"""))
                .andExpect(jsonPath("$[0].id").value(productSaved.getId()));
    }
    @Test
    @DirtiesContext
    void getProductById() throws Exception {
        BigDecimal price = BigDecimal.valueOf(0.29);
        ProductDTO productToSave = new ProductDTO ("Water", "Drinks", price);
        Product productSaved = productService.saveProduct(productToSave);
        mockMvc.perform(get("/api/products/{id}", productSaved.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(productSaved.getId()))
                .andExpect(jsonPath("$.productName").value("Water"))
                .andExpect(jsonPath("$.category").value("Drinks"))
                .andExpect(jsonPath("$.pricePerPiece").value(price));
    }
    @Test
    @DirtiesContext
    void saveNewProduct() throws Exception {
        String productJson = "{\"productName\": \"Water\", \"category\": \"Drinks\"}";
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.productName").value("Water"))
                .andExpect(jsonPath("$.category").value("Drinks"));
    }
}
