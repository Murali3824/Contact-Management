package com.contactmanager.service;

import com.contactmanager.dto.TagRequest;
import com.contactmanager.dto.TagResponse;
import com.contactmanager.exception.ResourceNotFoundException;
import com.contactmanager.model.Tag;
import com.contactmanager.model.User;
import com.contactmanager.repository.TagRepository;
import com.contactmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TagResponse> getTags(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return tagRepository.findByUser(user).stream()
                .map(tag -> new TagResponse(tag.getId(), tag.getName()))
                .collect(Collectors.toList());
    }

    public TagResponse createTag(TagRequest request, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Tag tag = Tag.builder()
                .name(request.getName())
                .user(user)
                .build();

        Tag saved = tagRepository.save(tag);
        return new TagResponse(saved.getId(), saved.getName());
    }

    public void deleteTag(Long id, String username) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));
        
        if (!tag.getUser().getEmail().equals(username)) {
            throw new RuntimeException("Unauthorized");
        }
        
        tagRepository.delete(tag);
    }
}
