package com.safepay.controller;

import com.safepay.service.AIScamDetectionService;
import com.safepay.service.NLPFeatureExtractor;
import com.safepay.model.ScamDetectionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/ai-scam")
@CrossOrigin(origins = "*")
public class AIScamController {
    
    @Autowired
    private AIScamDetectionService aiScamService;
    
    @Autowired
    private NLPFeatureExtractor featureExtractor;
    
    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeWithAI(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
        }
        
        ScamDetectionResult result = aiScamService.analyzeMessage(message);
        
        return ResponseEntity.ok(Map.of(
            "isScam", result.isScam(),
            "confidence", result.getConfidence(),
            "riskLevel", result.getRiskLevel(),
            "detectedPatterns", result.getDetectedPatterns(),
            "recommendation", result.getRecommendation(),
            "analysisType", "AI_ENHANCED"
        ));
    }
    
    @PostMapping("/batch-analyze")
    public ResponseEntity<Map<String, Object>> batchAnalyze(@RequestBody Map<String, List<String>> request) {
        List<String> messages = request.get("messages");
        if (messages == null || messages.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Messages array is required"));
        }
        
        List<Map<String, Object>> results = new ArrayList<>();
        for (String message : messages) {
            ScamDetectionResult result = aiScamService.analyzeMessage(message);
            results.add(Map.of(
                "message", message,
                "isScam", result.isScam(),
                "confidence", result.getConfidence(),
                "riskLevel", result.getRiskLevel()
            ));
        }
        
        return ResponseEntity.ok(Map.of(
            "results", results,
            "totalAnalyzed", results.size(),
            "scamCount", results.stream().mapToInt(r -> (Boolean) r.get("isScam") ? 1 : 0).sum()
        ));
    }
    
    @PostMapping("/features")
    public ResponseEntity<Map<String, Object>> extractFeatures(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        if (message == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
        }
        
        Map<String, Double> features = featureExtractor.extractFeatures(message);
        
        return ResponseEntity.ok(Map.of(
            "message", message,
            "features", features,
            "featureCount", features.size()
        ));
    }
}