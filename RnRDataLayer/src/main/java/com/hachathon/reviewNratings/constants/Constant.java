package com.hachathon.reviewNratings.constants;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public  class Constant {
    public static final int helpful_min = 0;
    public static final int helpful_max = 1000;
    public static final int rowCount=1000;

    public static final Map<String, Float> RNR_SCORE;
    public static final Map<String,Integer> SENTIMENT_FACTOR;
    static{

        Map<String, Float> rnrMap = new HashMap<>();
        rnrMap.put("HFS_V", (float) 5);
        rnrMap.put("HFS_NV", (float) 1);
        rnrMap.put("WS_V", (float) 2);
        rnrMap.put("WS_NV", (float) 0.5);
        RNR_SCORE = Collections.unmodifiableMap(rnrMap);


        Map<String,Integer> sentiment = new HashMap<>();
        sentiment.put("NEUTRAL",3);
        sentiment.put("SAD",2);
        sentiment.put("SUPER_SAD",1);
        sentiment.put( "HAPPY",4);
        sentiment.put( "SUPER_HAPPY",5);
        SENTIMENT_FACTOR = Collections.unmodifiableMap(sentiment);
    }


}

