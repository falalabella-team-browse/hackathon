package com.hachathon.reviewNratings.elasticsearch.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hachathon.reviewNratings.document.ReviewsAndRatings;
import lombok.SneakyThrows;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
public class ElasticsearchWrite {

    @Autowired
    public RestHighLevelClient client;

    @Value("${elasticsearch.index}")
    private String index;

    @SneakyThrows
    public BulkResponse writeBulkDocs(List<ReviewsAndRatings> docs){
        BulkRequest request = new BulkRequest();
        docs.forEach(doc -> {
            if(null != doc){
                ObjectMapper objectMapper = new ObjectMapper();
                UUID uuid = UUID.randomUUID();
                Map documentMapper = objectMapper.convertValue(doc, Map.class);
                IndexRequest indexRequest = new IndexRequest(index)
                        .source(documentMapper);
                indexRequest.id(uuid.toString());

                request.add(indexRequest);
            }
        });
        BulkResponse bulkResponse = client.bulk(request, RequestOptions.DEFAULT);
        return bulkResponse;
    }
}
