package com.contactmanager.service;

import com.contactmanager.dto.ContactRequest;
import com.contactmanager.dto.ContactResponse;
import com.contactmanager.exception.ResourceNotFoundException;
import com.contactmanager.model.Contact;
import com.contactmanager.model.Tag;
import com.contactmanager.model.User;
import com.contactmanager.repository.ContactRepository;
import com.contactmanager.repository.TagRepository;
import com.contactmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    public List<ContactResponse> getAllContacts(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return contactRepository.findByUser(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ContactResponse getContactById(Long id, String username) {
        Contact contact = getContactEntity(id, username);
        return mapToResponse(contact);
    }

    public ContactResponse createContact(ContactRequest request, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Contact contact = Contact.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .user(user)
                .isFavorite(false)
                .build();

        if (request.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
            contact.setTags(tags);
        }

        Contact saved = contactRepository.save(contact);
        return mapToResponse(saved);
    }

    public ContactResponse updateContact(Long id, ContactRequest request, String username) {
        Contact contact = getContactEntity(id, username);

        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setAddress(request.getAddress());

        if (request.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
            contact.setTags(tags);
        }

        Contact updated = contactRepository.save(contact);
        return mapToResponse(updated);
    }

    public void deleteContact(Long id, String username) {
        Contact contact = getContactEntity(id, username);
        contactRepository.delete(contact);
    }

    public List<ContactResponse> searchContacts(String name, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return contactRepository.searchByName(user, name).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ContactResponse> getFavorites(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return contactRepository.findByUserAndIsFavoriteTrue(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ContactResponse toggleFavorite(Long id, String username) {
        Contact contact = getContactEntity(id, username);
        contact.setFavorite(!contact.isFavorite());
        Contact updated = contactRepository.save(contact);
        return mapToResponse(updated);
    }

    public List<ContactResponse> getContactsByTag(Long tagId, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return contactRepository.findByUserAndTagsId(user, tagId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private Contact getContactEntity(Long id, String username) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));
        
        if (!contact.getUser().getEmail().equals(username)) {
            throw new RuntimeException("Unauthorized");
        }
        return contact;
    }

    private ContactResponse mapToResponse(Contact contact) {
        ContactResponse response = new ContactResponse();
        response.setId(contact.getId());
        response.setFirstName(contact.getFirstName());
        response.setLastName(contact.getLastName());
        response.setEmail(contact.getEmail());
        response.setPhone(contact.getPhone());
        response.setAddress(contact.getAddress());
        response.setFavorite(contact.isFavorite());
        response.setTagNames(contact.getTags().stream()
                .map(Tag::getName)
                .collect(Collectors.toList()));
        return response;
    }
}
