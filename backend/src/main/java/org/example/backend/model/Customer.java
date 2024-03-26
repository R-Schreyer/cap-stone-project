package org.example.backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Customer {
    private String id;
    private String firstname;
    private String lastname;
}
