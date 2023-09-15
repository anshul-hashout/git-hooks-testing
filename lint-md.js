const { exec } = require('child_process');
const fs = require('fs');

// Define a temporary file path for stderr output
const stderrFilePath = 'abc.txt';

// Create a write stream for the stderr file
const stderrStream = fs.createWriteStream(stderrFilePath);

// Execute the command and redirect stderr to the file
const command = 'markdownlint "content/**/*.md"';
const childProcess = exec(`${command} ${stderrFilePath}`, (error, stdout) => {
  if (stdout) {
    process.stdout.write(stdout);
  }
  if (error) {
    console.error(`Error: ${error.message}`);
  }
  
  // Close the stderr file stream
  stderrStream.end();
});

// Capture and process stderr output -> Writing in the file
childProcess.stderr.on('data', (data) => {
  stderrStream.write(data);
});

// Handle the exit of the command
childProcess.on('exit', (code) => {
  if (code === 0) {
    // Command executed successfully
    console.log('Command completed successfully.');
  } else {
    console.error(`Command failed with code ${code}.`);
  }

  // Read and process the stderr file
//   fs.readFile(stderrFilePath, 'utf8', (err, stderr) => {
//     if (stderr) {
//       const lines = stderr.split('\n');
//       lines.forEach((line) => {
//         if (line.trim() !== '') {
//           const [file, lineNumber, message] = line.split('|').map((part) => part.trim());
//           console.error(`File: ${file}, Line: ${lineNumber}, Message: ${message}`);
//         }
//       });
//     }

    // Remove the temporary stderr file
    fs.unlinkSync(stderrFilePath);
//   });
});

// Handle any errors during the execution of the command
childProcess.on('error', (err) => {
  console.error(`Command execution error: ${err.message}`);
});
