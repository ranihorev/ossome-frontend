import React from 'react';
import MovieField from "./Movie/MovieField";
import LocationField from "./Location/LocationField";
import MusicField from "./Music/MusicField";
import FoodField from "./Food/FoodField";
import ImageUpload from "./ImageUpload/ImageUpload";

export const activityFields = [
  {icon: '🎥', component: MovieField, name: 'movie', text: 'Watching'},
  {icon: '🗺️', component: LocationField, name: 'location', text: 'Visiting'},
  {icon: '🎧', component: MusicField, name: 'music', text: 'Listening'},
  {icon: '🍽️', component: FoodField, name: 'food', text: 'Eating'},
];

const otherFields = [
  {icon: '📷️', component: ImageUpload, name: 'images', text: 'Images'},
];

export const fields = activityFields.concat(otherFields);