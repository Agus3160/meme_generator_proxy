# Express Proxy for Imgflip API

This Express proxy serves as an intermediary between your application and the Imgflip API for meme generation. It provides endpoints to retrieve meme templates and generate custom memes using the Imgflip API.

## Prerequisites

Before running this proxy, ensure you have:

- Node.js installed
- Environment variables set for `IMGFLIP_USERNAME` and `IMGFLIP_PASSWORD` to access the Imgflip API

## Installation

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Set the required environment variables (`IMGFLIP_USERNAME` and `IMGFLIP_PASSWORD`).

## Usage

1. Start the proxy for dev using `npm run dev`.
2. Use the provided endpoints to interact with the Imgflip API.

## Endpoints

### GET /memes

- Description: Retrieves available meme templates.
- Response: An array of meme template objects.

### POST /generate

- Description: Generates a custom meme.
- Request Body*:
  ```json
  {
      "template_id": "string",
      "boxes": [
          {
              "text": "string"
          }
      ]
  }
*The pasword and username are set by the .env file so that is the request body that the client side has to send to this end point 