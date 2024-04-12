package org.example.backend.model;

import java.math.BigDecimal;

public record ProductDTO(String productName, String category,BigDecimal pricePerPiece) {
}
