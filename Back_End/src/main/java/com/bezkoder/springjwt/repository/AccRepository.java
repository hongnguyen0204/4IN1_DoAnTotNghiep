package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccRepository extends JpaRepository<Account,Integer> {
    @Query(value = "SELECT * FROM account_information WHERE username=?1  ", nativeQuery = true)
    Account GetIF(String username);

    @Query(value = "SELECT * FROM account_information WHERE reset_password_token=?1  ", nativeQuery = true)
    Account Gettoken(String token);

    @Query(value = "SELECT * FROM account_information WHERE email=?1  ", nativeQuery = true)
    Account findByEmail(String email);

    @Query(value = "SELECT * FROM account_information WHERE username=?1  ", nativeQuery = true)
    Account findByusername(String username);

    @Query(value = "SELECT * FROM account_information WHERE verification_email_token=?1 ", nativeQuery = true)
    Account findByToken(String token);

    @Query(value = "SELECT status_acc FROM account_information WHERE username=?1  ", nativeQuery = true)
    Boolean GetStt_Acc(String username);

    @Query(value = "SELECT ban FROM account_information WHERE username=?1  ", nativeQuery = true)
    Boolean GetBan(String username);

    @Query(value = "SELECT fullname FROM account_information WHERE username=?1  ", nativeQuery = true)
    String GetFullName(String username);
}
