package com.example.main.Repository;

import com.example.main.Entity.DangKy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DangKyRepository extends JpaRepository<DangKy, Integer> {

}
