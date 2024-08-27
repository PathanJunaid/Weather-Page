export interface AirQuality {
    co: number;         // Carbon Monoxide concentration in µg/m³
    no2: number;        // Nitrogen Dioxide concentration in µg/m³
    o3: number;         // Ozone concentration in µg/m³
    so2: number;        // Sulfur Dioxide concentration in µg/m³
    pm2_5: number;      // Particulate Matter 2.5 concentration in µg/m³
    pm10: number;       // Particulate Matter 10 concentration in µg/m³
    [key: string]: any; // For any other possible air quality metrics
}

export interface Condition {
    text: string;       // Description of the weather condition (e.g., 'Mist')
    icon: string;       // URL to the icon representing the weather condition
    code: number;       // Weather condition code
}

export interface Interface_CurrentWeather {
    air_quality: AirQuality;
    cloud: number;             // Cloud coverage percentage
    condition: Condition;
    dewpoint_c: number;        // Dew point in Celsius
    dewpoint_f: number;        // Dew point in Fahrenheit
    feelslike_c: number;       // Feels like temperature in Celsius
    feelslike_f: number;       // Feels like temperature in Fahrenheit
    gust_kph: number;          // Wind gust speed in kilometers per hour
    gust_mph: number;          // Wind gust speed in miles per hour
    heatindex_c: number;       // Heat index in Celsius
    heatindex_f: number;       // Heat index in Fahrenheit
    humidity: number;          // Humidity percentage
    is_day: number;            // Day (1) or Night (0)
    last_updated: string;      // Last updated time as a string
    last_updated_epoch: number; // Last updated time as a Unix epoch
    precip_in: number;         // Precipitation in inches
    precip_mm: number;         // Precipitation in millimeters
    pressure_in: number;       // Atmospheric pressure in inches
    pressure_mb: number;       // Atmospheric pressure in millibars
    temp_c: number;            // Temperature in Celsius
    temp_f: number;            // Temperature in Fahrenheit
    uv: number;                // UV index
    vis_km: number;            // Visibility in kilometers
    vis_miles: number;         // Visibility in miles
    wind_degree: number;       // Wind direction in degrees
    wind_dir: string;          // Wind direction as compass point (e.g., 'E')
    wind_kph: number;          // Wind speed in kilometers per hour
    wind_mph: number;          // Wind speed in miles per hour
    windchill_c: number;       // Wind chill in Celsius
    windchill_f: number;       // Wind chill in Fahrenheit
    [key: string]: any;        // Allow for any other properties
}
interface Day {
    maxtemp_c: number;        // Maximum temperature in Celsius
    maxtemp_f: number;        // Maximum temperature in Fahrenheit
    mintemp_c: number;        // Minimum temperature in Celsius
    mintemp_f: number;        // Minimum temperature in Fahrenheit
    avgtemp_c: number;        // Average temperature in Celsius
    avgtemp_f: number;        // Average temperature in Fahrenheit
    maxwind_kph: number;      // Maximum wind speed in kilometers per hour
    maxwind_mph: number;      // Maximum wind speed in miles per hour
    totalprecip_mm: number;   // Total precipitation in millimeters
    totalprecip_in: number;   // Total precipitation in inches
    avgvis_km: number;        // Average visibility in kilometers
    avgvis_miles: number;     // Average visibility in miles
    avghumidity: number;      // Average humidity percentage
    daily_will_it_rain: number; // Indicator if it will rain that day
    daily_chance_of_rain: number; // Chance of rain as a percentage
    daily_will_it_snow: number; // Indicator if it will snow that day
    daily_chance_of_snow: number; // Chance of snow as a percentage
    condition: {
        text: string;           // Description of the weather condition (e.g., 'Sunny')
        icon: string;           // URL to the icon representing the weather condition
        code: number;           // Weather condition code
    };
    uv: number;               // UV index
}

interface Astro {
    sunrise: string;          // Time of sunrise
    sunset: string;           // Time of sunset
    moonrise: string;         // Time of moonrise
    moonset: string;          // Time of moonset
    moon_phase: string;       // Current phase of the moon
    moon_illumination: string; // Illumination percentage of the moon
}

interface Hour {
    time: string;             // Time of the hour forecast
    temp_c: number;           // Temperature in Celsius
    temp_f: number;           // Temperature in Fahrenheit
    is_day: number;           // Indicator if it is day (1) or night (0)
    condition: {
        text: string;           // Description of the weather condition
        icon: string;           // URL to the icon representing the weather condition
        code: number;           // Weather condition code
    };
    wind_mph: number;         // Wind speed in miles per hour
    wind_kph: number;         // Wind speed in kilometers per hour
    wind_degree: number;      // Wind direction in degrees
    wind_dir: string;         // Wind direction as compass point (e.g., 'N')
    pressure_mb: number;      // Atmospheric pressure in millibars
    pressure_in: number;      // Atmospheric pressure in inches
    precip_mm: number;        // Precipitation in millimeters
    precip_in: number;        // Precipitation in inches
    humidity: number;         // Humidity percentage
    cloud: number;            // Cloud cover percentage
    feelslike_c: number;      // Feels like temperature in Celsius
    feelslike_f: number;      // Feels like temperature in Fahrenheit
    windchill_c: number;      // Wind chill in Celsius
    windchill_f: number;      // Wind chill in Fahrenheit
    heatindex_c: number;      // Heat index in Celsius
    heatindex_f: number;      // Heat index in Fahrenheit
    dewpoint_c: number;       // Dew point in Celsius
    dewpoint_f: number;       // Dew point in Fahrenheit
    will_it_rain: number;     // Indicator if it will rain
    chance_of_rain: string;   // Chance of rain percentage
    will_it_snow: number;     // Indicator if it will snow
    chance_of_snow: string;   // Chance of snow percentage
    vis_km: number;           // Visibility in kilometers
    vis_miles: number;        // Visibility in miles
    gust_mph: number;         // Wind gust speed in miles per hour
    gust_kph: number;         // Wind gust speed in kilometers per hour
    uv: number;               // UV index
}

export interface ForecastDay {
    date: string;             // Date in YYYY-MM-DD format
    date_epoch: number;       // Date in Unix epoch time
    day: Day;                 // Daily weather data
    astro: Astro;             // Astronomical data
    hour: Hour[];             // Array of hourly weather data
}

export interface Interface_Forecast {
    forecastday: ForecastDay[]; // Array of forecast data for each day
}

export interface Interface_CurLocation {
    country: string;           // Country name
    lat: number;               // Latitude
    localtime: string;         // Local time in "YYYY-MM-DD HH:mm" format
    localtime_epoch: number;   // Local time in Unix epoch format
    lon: number;               // Longitude
    name: string;              // Name of the location (e.g., city)
    region: string;            // Region or state name
    tz_id: string;             // Timezone identifier
  }
  
//   export default {AirQuality,Condition,Interface_CurrentWeather} ;
