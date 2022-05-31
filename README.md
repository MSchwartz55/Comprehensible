# Comprehensible

[Demo Site](https://comprehensible.herokuapp.com/home)

Comprehensible is an application for creating and finding video flashcards for studying new languages using comprehensible input

Video playback is achieved using the [YouTube iframe API](https://developers.google.com/youtube/iframe_api_reference)

Spaced repetition flashcard scheduling is achieved through an implementation of the [SM2](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2) algorithm

In the app, users are able to:
- Shuffle through a list of public video flashcards
- Add flashcards to the public pool
- Add flashcards to a personal collection
- Study their collection using spaced repetition

Future features:
- Tag based filtering system for public/personal flashcards
- Browser extension to improve ease of uploading


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





