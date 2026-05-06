package com.contactmanager.controller;

import com.contactmanager.dto.ContactRequest;
import com.contactmanager.dto.ContactResponse;
import com.contactmanager.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAllContacts(Authentication authentication) {
        return ResponseEntity.ok(contactService.getAllContacts(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getContactById(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(contactService.getContactById(id, authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody ContactRequest request, Authentication authentication) {
        return ResponseEntity.ok(contactService.createContact(request, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponse> updateContact(@PathVariable Long id, @Valid @RequestBody ContactRequest request, Authentication authentication) {
        return ResponseEntity.ok(contactService.updateContact(id, request, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id, Authentication authentication) {
        contactService.deleteContact(id, authentication.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ContactResponse>> searchContacts(@RequestParam String name, Authentication authentication) {
        return ResponseEntity.ok(contactService.searchContacts(name, authentication.getName()));
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<ContactResponse>> getFavorites(Authentication authentication) {
        return ResponseEntity.ok(contactService.getFavorites(authentication.getName()));
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<ContactResponse> toggleFavorite(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(contactService.toggleFavorite(id, authentication.getName()));
    }

    @GetMapping("/tags/{tagId}")
    public ResponseEntity<List<ContactResponse>> getContactsByTag(@PathVariable Long tagId, Authentication authentication) {
        return ResponseEntity.ok(contactService.getContactsByTag(tagId, authentication.getName()));
    }
}
