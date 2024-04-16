package org.example.backend.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class Customer {
    private String id;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private List<Order> customerOrderList;
}
