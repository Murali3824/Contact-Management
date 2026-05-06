package com.contactmanager.controller;

import com.contactmanager.dto.TagRequest;
import com.contactmanager.dto.TagResponse;
import com.contactmanager.service.TagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<TagResponse>> getTags(Authentication authentication) {
        return ResponseEntity.ok(tagService.getTags(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<TagResponse> createTag(@Valid @RequestBody TagRequest request, Authentication authentication) {
        return ResponseEntity.ok(tagService.createTag(request, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable Long id, Authentication authentication) {
        tagService.deleteTag(id, authentication.getName());
        return ResponseEntity.ok().build();
    }
}
