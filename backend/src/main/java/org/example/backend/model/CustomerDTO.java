package org.example.backend.model;

import java.util.List;

public record CustomerDTO(String firstname, String lastname, String address, String email,
                          List<Order> customerOrderList) {
}
