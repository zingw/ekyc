package com.dxtech.vn.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/kyc")
public class KycController {

    @PostMapping("/verify-customer")
    public ResponseEntity<String> verifyCustomer(
        @RequestParam(required = false) MultipartFile frontImg,
        @RequestParam(required = false) MultipartFile backImg,
        @RequestParam(required = false) MultipartFile imgWithUser
    ) {
        System.out.println("ok");
        return null;
    }
}
