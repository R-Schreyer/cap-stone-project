package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Builder
public class Product {
    private String id;
    private String productName;
    private String category;
    private BigDecimal pricePerPiece;
    private String producer;
    private String quantity;
}
