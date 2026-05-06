package com.contactmanager.repository;

import com.contactmanager.model.Tag;
import com.contactmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByUser(User user);
    Optional<Tag> findByNameAndUser(String name, User user);
}
