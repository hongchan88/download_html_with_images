Here's the updated README description with the new project name:

---

# Download HTML with Images

This repository contains a Node.js script to download all HTML, CSS, and other files from a specified web URL. It is designed to download every file under the provided URL and update image sources to local paths.

## Features

- Downloads all HTML, CSS, and associated files from the given URL.
- Downloads all images and updates the `src` attribute to point to the local image paths.

## Usage

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```sh
   cd <project-directory>
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

4. Run the script with the target URL:
   ```sh
   npm run dev -- <target-url>
   ```

## Requirements

- Node.js
- Required libraries: `axios`, `cheerio`, `fs`, `path`

Install the required libraries:

```sh
npm install axios cheerio fs path
```

## Notes

- Ensure you have the necessary permissions to download and use the files from the target URL.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

---

Feel free to modify this description to better fit your specific project details.
