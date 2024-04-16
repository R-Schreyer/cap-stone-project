package org.example.backend.controller;

import org.example.backend.model.Product;
import org.example.backend.model.ProductDTO;
import org.example.backend.service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Test
    @DirtiesContext
    public void testUpdateProductById() {
        ProductService productService = Mockito.mock(ProductService.class);

        String productId = "123";
        BigDecimal pricePerPiece = new BigDecimal("10.0");
        ProductDTO productDTO = new ProductDTO("Updated Product Name", "Updated Category", pricePerPiece);

        Product updatedProduct = new Product(productId, productDTO.productName(), productDTO.category(), productDTO.pricePerPiece());
        Mockito.when(productService.updateProduct(Mockito.eq(productId), Mockito.any(ProductDTO.class))).thenReturn(updatedProduct);

        ProductController productController = new ProductController(productService);

        ResponseEntity<Product> responseEntity = productController.updateProductById(productId, productDTO);

        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        Assertions.assertNotNull(responseEntity.getBody());

        Product updatedProductResponse = responseEntity.getBody();
        Assertions.assertEquals(productId, updatedProductResponse.getId());
        Assertions.assertEquals(productDTO.productName(), updatedProductResponse.getProductName());
        Assertions.assertEquals(productDTO.category(), updatedProductResponse.getCategory());
        Assertions.assertEquals(pricePerPiece, updatedProductResponse.getPricePerPiece());

        Mockito.verify(productService, Mockito.times(1)).updateProduct(Mockito.eq(productId), Mockito.eq(productDTO));
    }
}
