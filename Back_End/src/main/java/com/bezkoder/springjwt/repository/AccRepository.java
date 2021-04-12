package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccRepository extends JpaRepository<Account,Integer> {
    @Query(value = "SELECT * FROM account_information WHERE username=?1  ", nativeQuery = true)
    Account GetIF(String username);
}
