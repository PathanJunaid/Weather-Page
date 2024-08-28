# Weather Project

A weather application that fetches real-time weather data from the [Weather API](https://www.weatherapi.com/).

## Overview

This project allows users to view current weather conditions for any location by leveraging the [Weather API](https://www.weatherapi.com/). The application is built using Next.js and dynamically displays weather data. It automatically detects the user's location and also provides an option to search for weather data of specific places.

## Features

- **Real-Time Weather Data**: Displays current weather conditions.
- **Automatic Location Detection**: Fetches weather data based on the user's current location.
- **Search Functionality**: Allows users to search for weather information of specific places.
- **Responsive Design**: Adaptable to various screen sizes for optimal user experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/weather-project.git
   cd weather-project
## Install Dependencies

Using npm:

```bash
npm install
or
yarn install
```
## Set Up Environment Variables

Create a `.env.local` file in the root of your project and add your API key:

```bash
NEXT_PUBLIC_Weather_API=your_api_key_here
```
Replace your_api_key_here with your actual API key from [Weather API](https://www.weatherapi.com/).
## Usage

### Run the Development Server

Using npm:

```bash
npm run dev
or
yarn dev
```
Open Your Browser
Go to [http://localhost:3000](http://localhost:3000) to see the application in action.
## Building for Production

To build the application for production, use:

Using npm:

```bash
npm run build
or 
yarn build
```
Then, start the production server:

Using npm:

```bash
npm run start
```
Or using Yarn:

```bash
yarn start
```
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

This project is licensed under the MIT License.

## Acknowledgments

Thanks to [Weather API](https://www.weatherapi.com/) for providing the weather data.
