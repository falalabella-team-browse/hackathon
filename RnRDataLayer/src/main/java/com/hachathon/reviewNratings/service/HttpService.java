package com.hachathon.reviewNratings.service;

import com.hachathon.reviewNratings.beans.SentimentAnalysisRequest;
import com.hachathon.reviewNratings.beans.SentimentAnalysisResponse;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class HttpService {

    private WebClient webClient;

    @Value("${sentimentanalysis.uri}")
    private String sentimentAnalysisURI;

    @SneakyThrows
    public SentimentAnalysisResponse getSentimentAnalysis(SentimentAnalysisRequest request) {
        webClient = WebClient.create();
        SentimentAnalysisResponse response = webClient.post()
                .uri(sentimentAnalysisURI)
                .syncBody(request)
                .retrieve()
                .bodyToMono(SentimentAnalysisResponse.class).block();
        return response;
    }
}

