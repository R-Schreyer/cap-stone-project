package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class Order {
    private String id;
    private List<Product> productList;
    private BigDecimal price;
    private Date orderDate;

    // Konstruktor, Getter und Setter hier einfügen...
}


