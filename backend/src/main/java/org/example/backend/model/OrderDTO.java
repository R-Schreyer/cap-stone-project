package org.example.backend.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public record OrderDTO(List<Product> productList, BigDecimal price, Date orderDate, String customerId) {
}
