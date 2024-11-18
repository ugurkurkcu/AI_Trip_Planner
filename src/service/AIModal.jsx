// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// async function run() {
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'I cannot directly access and display images or real-time pricing for hotels. Hotel prices are incredibly dynamic and change constantly.  Therefore, I can\'t provide image URLs or exact pricing.  You\'ll need to use a booking website (like Expedia, Booking.com, Kayak, etc.) to check current prices and availability based on your travel dates.  Also, ratings are subjective and fluctuate. I\'ll give you the framework, and you can fill in the details from online searches.\n\n\n```json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada",\n    "duration": "3 Days",\n    "travelers": "Couple",\n    "budget": "Cheap"\n  },\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "Check online booking sites", \n      "hotelImageUrl": "Find image via Google Images",\n      "geoCoordinates": { "latitude": 36.1266, "longitude": -115.1726 },\n      "rating": "Check online reviews (e.g., Google, TripAdvisor)",\n      "description": "Circus Circus offers budget-friendly rooms, a midway, and various shows, though it might be a bit dated."\n    },\n    {\n      "hotelName": "Excalibur Hotel & Casino",\n      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "Check online booking sites",\n      "hotelImageUrl": "Find image via Google Images",\n      "geoCoordinates": { "latitude": 36.1006, "longitude": -115.172 },\n      "rating": "Check online reviews (e.g., Google, TripAdvisor)",\n      "description": "A themed hotel offering affordable rates with a medieval feel."\n    },\n    {\n      "hotelName": "[Consider a budget-friendly motel outside the Strip]",\n      "hotelAddress": "[Find one near the Strip using online search]",\n      "price": "Check online booking sites",\n      "hotelImageUrl": "Find image via Google Images",\n      "geoCoordinates": "[Find coordinates via online map]",\n      "rating": "Check online reviews",\n      "description": "Motels outside the Strip often provide the most affordable options.  Look for good reviews and convenient public transport links."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "plan": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Free outdoor pedestrian mall with light shows, street performers, and casinos.",\n          "placeImageUrl": "Find image via Google Images",\n          "geoCoordinates": { "latitude": 36.1699, "longitude": -115.1405 },\n          "ticketPricing": "Free (unless you do specific paid activities)",\n          "rating": "Check online reviews",\n          "timeTravel": "Evening (for the light shows)"\n        },\n        {\n          "placeName": "Container Park",\n          "placeDetails": "Unique shopping and dining area made from shipping containers, featuring a playground.",\n          "placeImageUrl": "Find image via Google Images",\n          "geoCoordinates": { "latitude": 36.1661, "longitude": -115.1385 },\n          "ticketPricing": "Free entry, costs for food/drinks",\n          "rating": "Check online reviews",\n          "timeTravel": "Afternoon/Early Evening"\n        }\n      ]\n    },\n    "day2": {\n      "plan": [\n        {\n          "placeName": "The Strip (walking tour)",\n          "placeDetails": "Walk the length of the Strip, taking in the sights and sounds of the casinos and hotels.",\n          "placeImageUrl": "Find image via Google Images",\n          "geoCoordinates": "[The Strip\'s coordinates are a broad range]",\n          "ticketPricing": "Free (unless you gamble or enter attractions)",\n          "rating": "N/A - Subjective experience",\n          "timeTravel": "All day (break it up to avoid fatigue)"\n        },\n        {\n          "placeName": "[Free Show - Check Las Vegas schedules]",\n          "placeDetails": "Many casinos offer free shows, look up options available.",\n          "placeImageUrl": "Find image via Google Images (once you\'ve selected a show)",\n          "geoCoordinates": "[Based on chosen show\'s location]",\n          "ticketPricing": "Free",\n          "rating": "Check online reviews",\n          "timeTravel": "[Depends on show timings]"\n        }\n      ]\n    },\n    "day3": {\n      "plan": [\n        {\n          "placeName": "Seven Magic Mountains",\n          "placeDetails": "Outdoor art installation south of Las Vegas (requires transport).",\n          "placeImageUrl": "Find image via Google Images",\n          "geoCoordinates": { "latitude": 36.0122, "longitude": -114.929 },\n          "ticketPricing": "Free",\n          "rating": "Check online reviews",\n          "timeTravel": "Afternoon (allow time for travel)"\n        },\n        {\n          "placeName": "[Explore a cheaper buffet]",\n          "placeDetails": "Many hotels have affordable buffets – check daily specials for value.",\n          "placeImageUrl": "Find image via Google Images",\n          "geoCoordinates": "[Location varies based on the chosen buffet]",\n          "ticketPricing": "[Check buffet prices]",\n          "rating": "Check online reviews",\n          "timeTravel": "Lunch or Dinner"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Important Notes:**\n\n* **Transportation:** Factor in the cost of transportation.  Walking is free on the Strip, but getting to Seven Magic Mountains will require a car, rideshare, or bus (research costs).\n* **Food:** This plan assumes you\'ll eat affordably, likely utilizing cheaper eateries and maybe packing some snacks/drinks.  Las Vegas can be expensive.\n* **Deals:** Look for coupons and discounts online before you go.\n* **Flexibility:** This is a *suggested* itinerary.  Feel free to adjust based on your interests and energy levels.\n\n\nRemember to replace the bracketed placeholders with actual information from your online searches.  Have a fantastic and budget-friendly trip!\n',
        },
      ],
    },
  ],
});

// }
