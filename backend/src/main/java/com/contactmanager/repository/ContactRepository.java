package com.contactmanager.repository;

import com.contactmanager.model.Contact;
import com.contactmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUser(User user);
    
    List<Contact> findByUserAndIsFavoriteTrue(User user);
    
    @Query("SELECT c FROM Contact c WHERE c.user = :user AND " +
           "(LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
           "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Contact> searchByName(@Param("user") User user, @Param("name") String name);

    List<Contact> findByUserAndTagsId(User user, Long tagId);
}
