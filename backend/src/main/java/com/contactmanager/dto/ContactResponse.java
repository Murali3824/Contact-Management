package com.contactmanager.dto;

import lombok.Data;

import java.util.List;

@Data
public class ContactResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private boolean isFavorite;
    private List<String> tagNames;
}
