# IP-RMT52

# MoodMix: AI-Powered Mood-Based Music Curator

MoodMix is a full-stack application that curates music playlists based on user moods using AI technology.

## Features
- Mood-based playlist generation
- Integration with Spotify, OpenAI, and Genius APIs
- User authentication with Google OAuth
- Activity-specific music recommendations
- Enhanced lyric analysis
- "Song Story" feature

## Tech Stack
- Frontend: React (Vite)
- Backend: Express.js
- Database: Firebase
- APIs: Spotify, OpenAI, Genius
- Authentication: Google OAuth

## Documentation 

# MoodMix API Documentation

## Table of Contents
1. [Authentication](#authentication)
   - [Register](#register)
   - [Login](#login)
2. [Tracks](#tracks)
   - [Get All Tracks](#get-all-tracks)
3. [Playlists](#playlists)
   - [Create a Playlist](#create-a-playlist)
4. [Mood Analysis](#mood-analysis)
   - [Get Mood Analysis](#get-mood-analysis)
5. [Error Handling](#error-handling)
6. [Database Models](#database-models)

## Authentication

### Register

Register a new user account.

- **URL**: `/api/register`
- **Method**: `POST`
- **Auth required**: No

#### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Success Response

- **Code**: 201 Created
- **Content**: `{ "message": "User registered successfully" }`

#### Error Response

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Missing required fields" }`

### Login

Authenticate a user and receive an access token.

- **URL**: `/api/login`
- **Method**: `POST`
- **Auth required**: No

#### Request Body

```json
{
  "username": "string",
  "password": "string"
}
```

#### Success Response

- **Code**: 200 OK
- **Content**: `{ "token": "string" }`

#### Error Response

- **Code**: 401 Unauthorized
  - **Content**: `{ "message": "Invalid credentials" }`

## Tracks

### Get All Tracks

Retrieve a list of all tracks.

- **URL**: `/api/tracks`
- **Method**: `GET`
- **Auth required**: Yes

#### Success Response

- **Code**: 200 OK
- **Content**: Array of track objects

#### Error Response

- **Code**: 401 Unauthorized

## Playlists

### Create a Playlist

Create a new playlist.

- **URL**: `/api/playlist`
- **Method**: `POST`
- **Auth required**: Yes

#### Request Body

```json
{
  "name": "string",
  "tracks": ["track_id1", "track_id2", ...]
}
```

#### Success Response

- **Code**: 201 Created
- **Content**: Created playlist object

#### Error Responses

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Name is required" }`
- **Code**: 401 Unauthorized

## Mood Analysis

### Get Mood Analysis

Get mood analysis for a list of tracks.

- **URL**: `/api/mood-analysis`
- **Method**: `GET`
- **Auth required**: Yes

#### Query Parameters

- `tracks`: Comma-separated list of track IDs

#### Success Response

- **Code**: 200 OK
- **Content**: `{ "mood": "string" }`

#### Error Responses

- **Code**: 400 Bad Request
  - **Content**: `{ "message": "Tracks are required" }`
- **Code**: 401 Unauthorized

## Error Handling

All endpoints in this API use a centralized error handling mechanism. Common error responses include:

- **400 Bad Request**: Validation errors or missing required fields
- **401 Unauthorized**: Invalid or missing authentication token
- **500 Internal Server Error**: Unexpected server errors

## Database Models

The API uses the following database models:

### Track
- Fields: title, artist, url

### Playlist
- Fields: name, tracks (array of track references)

### User
- Fields: username, email, password

Note: Detailed field validations and constraints are implemented in the database models using mock data.