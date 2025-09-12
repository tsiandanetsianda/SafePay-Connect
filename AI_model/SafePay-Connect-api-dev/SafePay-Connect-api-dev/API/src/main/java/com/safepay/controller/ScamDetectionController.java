package com.safepay.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safepay.model.ScamDetectionResult;
import com.safepay.service.ScamDetectionService;

@RestController
@RequestMapping("/api/scam")
@CrossOrigin(origins = "*")
public class ScamDetectionController {

    @Autowired
    private ScamDetectionService scamDetectionService;

    @PostMapping("/analyze")
    public ResponseEntity<ScamDetectionResult> analyzeMessage(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        ScamDetectionResult result = scamDetectionService.analyzeMessage(message);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/analyze/batch")
    public ResponseEntity<Map<String, ScamDetectionResult>> analyzeMessages(@RequestBody Map<String, List<String>> request) {
        List<String> messages = request.get("messages");
        if (messages == null || messages.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Map<String, ScamDetectionResult> results = scamDetectionService.analyzeMessages(messages);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "healthy", "service", "scam-detection"));
    }
}