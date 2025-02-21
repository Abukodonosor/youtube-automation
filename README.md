# Youtube automation tool 

This script is designed to mimic the human interaction with youtube. To act like automation tool to boost your youtube channel.

stepper scraper walkthrough

dep: [ node v20.9.0+ , npm 10.1.0+ ]

```
note: If you are on windows, the Puppeteer will not work. You need to do some additional setup.

```

# Scraping Recept

This is a script designed for scraping data. It utilizes Puppeteer for web scraping. With this script, you can easily extract data from web pages using Puppeteer and manipulate it as needed. It will use like fast boilerplate code for other scraping activities. Down the document, is section about usage :)

## Installation

Before running the script, make sure you have Node.js installed on your machine. Then, follow these steps:

## Clone the repository:

```bash
Copy code
git clone https://github.com/your-username/scrping-recept.git

```

Navigate to the project directory and install dependencies:

```
   cd scrping-recept
   npm install or pnpm install

```

## DEV

### If you want to run the script to update item-results.json

```
npm run dev or pnpm dev
This will execute the index.ts file directly with TypeScript.
```

## Testing

### For running tests using Jest, you can use:

```
npm test
This will run any test files in your project.
```

## Build

### If you want to compile the TypeScript code into JavaScript, use:

```
npm run build
This command will create a dist directory with the compiled JavaScript files.
```

## Start

### To run the compiled JavaScript version of the script, use:

```
npm start:build
This will execute the index.js file located in the dist directory.
```

## Usage

You can modify the index.ts file to suit your specific scraping needs. By default, it uses Puppeteer to scrape data from web pages. Ensure you have proper permissions to scrape the websites you intend to target.

# For commercial usage

There are a few mechanisms that should be implemented before you wish to use this script commercially.

- Setup proxy adapters and multiple proxy providers/servers
- Make an orchestration layer instead of an "accumulator" then we can run the scraping in a concurrent way
- Fallback and retry logic (when the request gets blocked, or HTML changes the structure)
- ...


## Dependencies

Puppeteer - Headless Chrome Node API
TypeScript - Typed JavaScript at Any Scale
Jest - JavaScript Testing Framework
Other dependencies listed in package.json
License
This project is licensed under the ISC License - see the LICENSE file for details.
