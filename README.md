# Comprehensible

[Demo Site](https://comprehensible.herokuapp.com)

**Comprehensible** is an application for creating and finding video flashcards for studying new languages using comprehensible input

Video playback is achieved using the [YouTube iframe API](https://developers.google.com/youtube/iframe_api_reference)

Spaced repetition flashcard scheduling is achieved through an implementation of the [SM2](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2) algorithm

**Current features:**
- Shuffle through a list of public video flashcards
- Add flashcards to the public pool
- Add flashcards to a personal collection
- Study their collection using spaced repetition

**Future features:**
- Tag based filtering system for public/personal flashcards
- Reporting feature for flashcard quality moderation
- Browser extension to improve card creation workflow


To run the app locally:
```
yarn install
createdb Comprehensible_development
cd server
yarn run migrate:latest
yarn run db:seed
cd ..
yarn run dev 
```





